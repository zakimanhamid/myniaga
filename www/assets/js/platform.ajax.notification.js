//=== Notification push to Browser===//
//==PUSH NOTIFY===//	
function appNotificationHeader(){ 
	//push to browser
	var pushNotify=function(data){
		var url = "platform/library/js/myNotify.js";
		$.getScript( url, function() {
		  var options={
				'title':"Niagain",
				'body':"You have "+data.result.summary.NOTIFICATION_COUNTER+" notifications",
				'icon':"https://cache.niagain.com/niaga/images/brand-asset/mascot-mini.png"
			}; 
			//run push notify
			var notifi=new notifyMe(options);
		});
		//enabled klik notifkasi,
		$.cookie('clearPushFlagOnDatabaseClick','enabled');
		
	}//end push to browser


	var appNotificationHeaderItems=function(data){
		$(".appNotificationHeaderItems").empty();
		for(i=0;i<data.result.items.length;i++){
			$(".appNotificationHeaderItems").append('<li>'+
			   '<a href="'+data.result.items[i].HREF+'">'+
				  '<i class="'+data.result.items[i].NOTIFICATION_ICON_SIMBOL+'"></i> '+data.result.items[i].ChildItemsCount+' '+data.result.items[i].NOTIFICATION_TYPE+''+
			   '</a>'+
			'</li>');
		}//end for
	}
	
	var appNotificationHeaderItemsEmpty=function(data){
		$(".appNotificationHeaderItems").empty();
		$(".appNotificationHeaderItems").html('<li>'+
			   '<a href="#">'+
				  '<i class="fa fa-exclamation-triangle text-danger"></i> Tidak ada notifikasi baru'+
			   '</a>'+
		'</li>');
	}

	//theme
	var appNotificationHeaderTheme=function(data){
		if(data.respon.pesan=="sukses"){
			//aktifkan angka counter
			$(".clearPushFlagOnDatabase span").removeClass('hidden');
			//push counter
			//$(".NOTIFICATION_COUNTER").html(data.result.summary.NOTIFICATION_COUNTER);
			$(".NOTIFICATION_COUNTER").html(data.result.items.length);
			$(".NOTIFICATION_COUNTER").attr('NOTIFICATION_COUNTER_CURRENT',data.result.summary.NOTIFICATION_COUNTER);
			if(data.result.summary.NOTIFICATION_COUNTER_PUSH_NOTIFY=='Y'){
				//panggil fungsi push notification
				pushNotify(data);
			}//end if 
			else{ }	
			
			//header notification Dropdown
			if(data.result.items.length>=1){
				NotifiListHeader=new appNotificationHeaderItems(data);
			}else{
				NotifiListHeaderEmpty=new appNotificationHeaderItemsEmpty(data);
			}
			
		}else if(data.respon.pesan=="gagal"){
			//no act
			//alert(data.respon.text_msg);
			//sembunyikan angka counter
			$(".clearPushFlagOnDatabase span").addClass('hidden');
			NotifiListHeaderEmpty=new appNotificationHeaderItemsEmpty(data);
		}
	}
	//end theme
	//ambil nilai counter terakhir
	var getLastCounter=$(".NOTIFICATION_COUNTER").attr("NOTIFICATION_COUNTER_CURRENT");
	var params ={
		//parameter kepala sebagai parameter informasi dan authentikasi
		headers:{
				aplikasi:"sistem",
				format:"json", //json,text
				case:"notification__json_islogin_header_counter_nonlogin",  //module: user  , case module : json_nonlogin_auth_login
				data_http:$.cookie('data_http'), //wajib ketika akses data menggunakan autentikasi
				token_http:$.cookie('token_http'), //wajib ketika akses data menggunakan autentikasi
				sistem_data_gid:PlatformConfig.sistem_data_gid
				},
		//parameter input untuk disimpan ke database atau sebagai filter data	
		contents:{
				'getLastCounter':getLastCounter
				},
		//parameter kaki untuk halaman dan batas record tampil tiap halaman	
		footers:{
				halaman:"1",
				batas:"10"
				}
	}; //parameter
	var JSONP=new connectJSONP(params,appNotificationHeaderTheme);
}//end NOTIFY
//run notifi counter
appNotificationHeader();
setInterval(function(){appNotificationHeader();},15000);

//hapus push flag on database,
var clearPushFlagOnDatabase=function(){
	//theme
	var clearPushFlagOnDatabaseTheme=function(data){
		//hidde 
		//alert(data.respon.text_msg);
		//setelah klik notifikasi disabled klik notifikasi, sampai ada pembaharuan
		$.cookie('clearPushFlagOnDatabaseClick','disabled');
	}//end theme
		
	var params ={
		//parameter kepala sebagai parameter informasi dan authentikasi
		headers:{
				aplikasi:"sistem",
				format:"json", //json,text
				case:"notification__json_islogin_header_counter_clear_push_flag_nonlogin",  //module: user  , case module : json_nonlogin_auth_login
				data_http:$.cookie('data_http'), //wajib ketika akses data menggunakan autentikasi
				token_http:$.cookie('token_http'), //wajib ketika akses data menggunakan autentikasi
				sistem_data_gid:PlatformConfig.sistem_data_gid
				},
		//parameter input untuk disimpan ke database atau sebagai filter data	
		contents:{},
		//parameter kaki untuk halaman dan batas record tampil tiap halaman	
		footers:{}
	}; //parameter
	var JSONP=new connectJSONP(params,clearPushFlagOnDatabaseTheme);
}//end hapus push flag on database

//onclick dropdown notification
$(".clearPushFlagOnDatabase").on('click',function(){
	if($.cookie('clearPushFlagOnDatabaseClick')=='enabled'){
		var cPFD=new clearPushFlagOnDatabase();
	}else{ }
});


