var api_endpoint = ENV.apiEndpoint;
var api_socket_endpoint = ENV.websocketsEndpoint;

var api_token = null;
var websocket = null;
var channel_id = null;
var space_auth = null;

function set_space_auth(hash) {
  space_auth = hash;
}

function load_resource(method, path, data, on_success, on_error, on_progress) {
  var req = new XMLHttpRequest();
  req.onload = function(evt,b,c) {
    if (req.status>=200 && req.status<=299) {
      var parsed = null;
      
      try {
        var parsed = JSON.parse(req.response);
      } catch(e) {};

      if (data && parsed && parsed._id) {
        // mutate the local object and update its _id
        data._id = parsed._id;
      }
      if (on_success) {
        on_success(parsed,req);
      }
    } else {
      if (on_error) {
        on_error(req);
      }
    }
  };

  req.onerror = function(err) {
    console.log(err,err.target);
    // window._spacedeck_location_change is a flag set by redirect / reload functions
    if (!window._spacedeck_location_change) {
      if (window.spacedeck && window.spacedeck.active_space) {
        window.spacedeck.offline = true;
      } else {
        alert("Could not connect to Spacedeck. Please reconnect and try again.");
      }
    }
    if (on_error) on_error(req);
  }

  req.withCredentials = true;
  req.open(method, api_endpoint+"/api"+path, true);

  if (api_token) {
    req.setRequestHeader("X-Spacedeck-Auth", api_token);
  }
  if (space_auth) {
    req.setRequestHeader("X-Spacedeck-Space-Auth", space_auth);
  }
  if (channel_id) {
    req.setRequestHeader("X-Spacedeck-Channel", channel_id);
  }

  try {
    if (data) {
      if (data.toString() == "[object File]") {
        req.setRequestHeader("Content-type", data.type);
        req.setRequestHeader("Accepts", "application/json");
        req.upload.onprogress = function(e) {
          console.log("upload progress: ",e.loaded,e.total);
          if (on_progress) on_progress(e);
        }
        req.send(data);
      } else {
        req.setRequestHeader("Content-type", "application/json");
        req.send(JSON.stringify(data));
      }
    } else {
      req.send();
    }
  } catch (e) {
    if (on_error) {
      on_error(req, e);
    } else {
      throw(e);
    }
  }
}


function get_resource(path, on_success, on_error, on_progress) {
  load_resource("get", path, null, on_success, on_error, on_progress);
}

function load_profile(name, on_success, on_error) {
  load_resource("get", "/users/slug?slug="+name, null, on_success, on_error);
}

function load_current_user(on_success, on_error) {
  load_resource("get", "/users/current", null, on_success, on_error);
}

function load_space(id, on_success, on_error) {
  if (!id || id=="undefined") {
    console.error("load_space id:", id);
    return;
  }
  var url = "/spaces/"+id;
  load_resource("get", url, null, function(space, req) {
    var role = req.getResponseHeader("x-spacedeck-space-role");
    on_success(space, role);
  }, on_error);
}

function load_space_path(id, on_success, on_error) {
  var url = "/spaces/"+id+"/path";
  load_resource("get", url, null, function(space, req) {
    on_success(space);
  }, on_error);
}

function load_spaces(id, is_home, on_success, on_error) {
  if (!id || id=="undefined") {
    console.error("load_spaces id:", id);
    return;
  }

  var q = "?parent_space_id="+id;
  load_resource("get", "/spaces"+q, null, function(spaces) {
    on_success(spaces);
  }, on_error);
}

function load_history(s, on_success, on_error) {
  load_resource("get", "/spaces/"+ s._id +"/digest", null, on_success, on_error);
}

function load_filtered_spaces(filter, on_success, on_error) {
  load_resource("get", "/spaces?filter="+filter, null, on_success, on_error);
}

function load_spaces_search(query, on_success, on_error) {
  load_resource("get", "/spaces?search="+query, null, on_success, on_error);
}

function load_artifacts(id, on_success, on_error) {
  load_resource("get", "/spaces/"+id+"/artifacts", null, on_success, on_error);
}

function save_artifact(a, on_success, on_error) {
  if (a._id) {
    load_resource("put", "/spaces/"+a.space_id+"/artifacts/"+a._id,a,on_success,on_error);
  } else {
    load_resource("post", "/spaces/"+a.space_id+"/artifacts",a,on_success,on_error);
  }
}

function save_pdf_file(space, point, file, zones, on_success, on_error, on_progress) {
  load_resource("post", "/spaces/"+space._id+"/artifacts-pdf?filename="+file.name + "&x="+point.x+"&y="+point.y + "&zones="+zones,file,on_success,on_error,on_progress);
}

function save_artifact_file(a, file,filename, on_success, on_error, on_progress) {
  load_resource("post", "/spaces/"+a.space_id+"/artifacts/"+a._id+"/payload?filename="+filename,file,on_success,on_error,on_progress);
}

function save_space(s, on_success, on_error) {
  if (s._id) {
    delete s['artifacts'];
    load_resource("put", "/spaces/"+s._id,s,on_success,on_error);
  } else {
    load_resource("post", "/spaces",s,on_success,on_error);
  }
}

function delete_space(s, on_success, on_error) {
  load_resource("delete", "/spaces/"+s._id, null, on_success, on_error);
}

function delete_artifact(a, on_success, on_error) {
  load_resource("delete", "/spaces/"+a.space_id+"/artifacts/"+a._id);
}

function duplicate_space(s, to_space_id, on_success, on_error) {
  var path = "/spaces/"+s._id+"/duplicate";
  if(to_space_id) {
    path += "?parent_space_id=" + to_space_id
  }
  load_resource("post", path, null,on_success,on_error);
}

function load_members(space, on_success, on_error) {
  load_resource("get", "/spaces/"+ space._id +"/memberships", null, on_success, on_error);
}

function create_membership(space, m, on_success, on_error) {
  load_resource("post", "/spaces/"+ space._id +"/memberships", m, on_success, on_error);
}

function save_membership(space, m, on_success, on_error) {
  load_resource("put", "/spaces/"+ space._id +"/memberships/" + m._id, m, on_success, on_error);
}

function delete_membership(space, m, on_success, on_error) {
  load_resource("delete", "/spaces/"+ space._id +"/memberships/"+m._id, m, on_success, on_error);
}

function accept_invitation(id, code, on_success, on_error) {
  load_resource("get", "/memberships/"+ id +"/accept?code="+code, null, on_success, on_error);
}

function get_join_link(space_id, on_success, on_error) {
  load_resource("get", "/invitation_codes?space_id="+space_id, null, on_success, on_error);
}

function create_join_link(space_id, role, on_success, on_error) {
  load_resource("post", "/invitation_codes", {join_role:role, sticky:true, space_id:space_id}, on_success, on_error);
}

function delete_join_link(link_id, on_success, on_error) {
  load_resource("delete", "/invitation_codes/"+link_id, null, on_success, on_error);
}

function load_team_members(id, on_success, on_error) {
  load_resource("get", "/teams/"+ id +"/memberships", null, function(team) {
    on_success(team);
  }, on_error);
}

function save_avatar_file(type, o, file, on_success, on_error) {
  load_resource("post", "/"+type+"s/"+o._id+"/avatar", file, on_success,on_error);
}

function remove_avatar_file(type, o, on_success, on_error) {
  load_resource("delete", "/"+type+"s/"+o._id+"/avatar", null, on_success,on_error);
}

function save_space_background_file(space, file, on_success, on_error) {
  load_resource("post", "/spaces/"+space._id+"/background?filename="+file.name, file, on_success,on_error);
}

function save_user_background_file(user, file, on_success, on_error) {
  load_resource("post", "/users/"+user._id+"/background", file, on_success,on_error);
}

function save_user_password(u, pass, newPass, on_success, on_error) {
  load_resource("post", "/users/" + u._id + "/password", {old_password:pass, new_password:newPass}, on_success, on_error);
}

function get_featured_users(on_success, on_error) {
  load_resource("get", "/users/featured", null, on_success, on_error);
}

function save_user(u, on_success, on_error) {
  load_resource("put", "/users/"+u._id,u,on_success,on_error);
}

function delete_user(u, password, on_success, on_error) {
  load_resource("delete", "/users/"+u._id +"?password="+password,null,on_success,on_error);
}

function create_user(name, email, password, password_confirmation, invite_code, on_success, on_error) {
  load_resource("post", "/users", {email:email, nickname:name, password:password, password_confirmation: password_confirmation, invite_code: invite_code}, on_success, on_error);
}

function create_session(email, password, on_success, on_error) {
  load_resource("post", "/sessions", {email:email, password:password}, on_success, on_error);
}

function delete_session(on_success, on_error) {
  load_resource("delete", "/sessions/current", null, on_success, on_error);
}

function create_oauthtoken(on_success, on_error) {
  load_resource("get", "/users/oauth2callback/url", null, on_success, on_error);
}

function create_session_for_oauthtoken(token, on_success, on_error) {
  load_resource("get", "/users/loginorsignupviagoogle?code="+token, null, on_success, on_error);
}

function create_password_reset(email, on_success, on_error) {
  load_resource("post", "/users/password_reset_requests?email=" + encodeURIComponent(email), null,  on_success, on_error);
}

function confirm_password_reset(password, confirm, on_success, on_error) {
  load_resource("post", "/users/password_reset_requests/"+confirm+"/confirm", {password:password}, on_success, on_error);
}

function confirm_user(user, token, on_success, on_error) {
  load_resource("put", "/users/"+user._id+"/confirm", {token:token}, on_success, on_error);
}

function resent_confirm_mail(user, on_success, on_error) {
  load_resource("post", "/users/"+user._id+"/confirm", {}, on_success, on_error);
}

function create_feedback(user, m, on_success, on_error) {
  load_resource("post", "/users/feedback", {text: m}, on_success, on_error);
}

function save_team(u, on_success, on_error) {
  load_resource("put", "/teams/"+u._id,u,on_success,on_error);
}

function load_comments(space_id, on_success, on_error) {
  load_resource("get", "/spaces/"+space_id+"/messages", null, on_success, on_error);
}

function save_comment(space_id, data, on_success, on_error) {
  load_resource("post", "/spaces/"+space_id +"/messages", data, on_success, on_error);
}

function delete_comment(space_id, message_id,on_success, on_error) {
  load_resource("delete", "/spaces/"+space_id +"/messages/"+ message_id, null , on_success, on_error);
}

function update_comment(space_id, data, on_success, on_error) {
  load_resource("post", "/spaces/"+space_id+"/messages/" + data._id , data, on_success, on_error);
}

function load_notifications(u, on_success, on_error) {
  load_resource("get", "/notifications", null, on_success, on_error);
}
