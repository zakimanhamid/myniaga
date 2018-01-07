//domain platform
//var apiKey="30f6558a0309f17fabe3b4570b8e9998";
//var apiUser="platform";
//var domain="https://apis.web.id/jsonp";
//var sistem_data_gid="platform";

var PlatformConfig={
	apiKey:"30f6558a0309f17fabe3b4570b8e9998",
	apiUser:"platform",
	domain:"https://apis.web.id/jsonp",
	sistem_data_gid:"platform",
	currentUrl:window.location.href	
};

var connectJSONP=function(params,callback){ 
	$.getJSON(PlatformConfig.domain+'?callback=?', params, function(data) {
		callback(data);
	});
}

//==Logout Scope===//
function appsLogout(){
    var appsLogoutTheme=function(data){
		if(data.respon.pesan=="sukses"){
			$.cookie('username', 'null', { expires:1 });
			$.cookie('data_http','0', { expires:1 });
			$.cookie('token_http','0', { expires:1 }); 
			window.location="index.html";
		}else if(data.respon.pesan=="gagal"){
			alert(data.respon.text_msg);
		}
	}//theme
	
    var params ={
		//parameter kepala sebagai parameter informasi dan authentikasi
		headers:{
			aplikasi:"sistem",
			format:"json",
			case:"user__json_nonlogin_auth_logout",  //module: user  , case module : json_nonlogin_auth_login
			data_http:$.cookie('data_http'), //wajib ketika akses data menggunakan autentikasi
			token_http:$.cookie('token_http'), //wajib ketika akses data menggunakan autentikasi
			sistem_data_gid:PlatformConfig.sistem_data_gid
			},
		//parameter input untuk disimpan ke database atau sebagai filter data	
		contents:{ },
		//parameter kaki untuk halaman dan batas record tampil tiap halaman	
		footers:{ }
	}; //parameter
    var JSONP=new connectJSONP(params,appsLogoutTheme);
}//end logout

//==Login scope===/
function appLogin(){
	var appLoginTheme=function(data){
		if(data.respon.pesan=="sukses"){
			$.cookie('username', 'sukses', { expires:1 });
			$.cookie('data_http',data.result.items.DATA_HTTP, { expires:1 });
			$.cookie('token_http',data.result.items.TOKEN_HTTP, { expires:1 }); 
			window.location="dashboard.html";
		}else if(data.respon.pesan=="gagal"){
			//no act
			$(".btn-login").html("Sign In");$(".btn-login").removeAttr("disabled");
			$(".fLogin").prepend('<div class="alert alert-danger alert-dismissible">'+
				'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
				'<h4><i class="icon fa fa-ban"></i> Gagal</h4>'+
				'<small>'+data.respon.text_msg+'</small>'+
				'</div>');
			setTimeout(function() {
				$(".alert").alert('close');
			}, 4000);
			$.cookie('username', 'null', { expires:1 });
			$.cookie('data_http','0', { expires:1 });
		}
	}	
	
	$(".btn-login").html("Loading...");$(".btn-login").attr("disabled","disabled");
	var params ={
			//parameter kepala sebagai parameter informasi dan authentikasi
			headers:{
					aplikasi:"sistem",
					format:"json",
					case:"user__json_nonlogin_auth_login",  //module: user  , case module : json_nonlogin_auth_login
					sistem_data_gid:PlatformConfig.sistem_data_gid,
					},
			//parameter input untuk disimpan ke database atau sebagai filter data	
			contents:{
					USER_EMAIL:$(".fLogin .USER_EMAIL").val(),
					USER_PWD:$(".fLogin .USER_PWD").val(),
					},
			//parameter kaki untuk halaman dan batas record tampil tiap halaman	
			footers:{}
	}; //parameter
	var JSONP=new connectJSONP(params,appLoginTheme);	
}//end appLogin()


//function appsLogoutTheme(data){
	//if(data.respon.pesan=="sukses"){
		//$.cookie('username', 'null', { expires:1 });
		//$.cookie('data_http','0', { expires:1 });
		//$.cookie('token_http','0', { expires:1 }); 
		//window.location="index.html";
	//}else if(data.respon.pesan=="gagal"){
		//alert(data.respon.text_msg);
	//}
//}//end theme
