// Ajax untuk load menu utama
function appMenuTheme(data){
	if(data.respon.pesan=="sukses"){
			$("#main-menu").empty();	
			$("#main-menu").append('<li class="treeview">'+
					'<a href="dashboard.html">'+
						'<i class="fa fa-dashboard"></i> <span>Dashboard</span>'+
						'<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>'+
					'</a>'+
					'</li>');
					
			//parsing main-menu
			for(i=0;i<data.result.items.length;i++){
				$("#main-menu").append('<li class="treeview">'+
					'<a><i class="'+data.result.items[i].USER_MENU_ICON+'"></i><span>'+data.result.items[i].USER_PRIVILEGES_MASTER_NAME+'</span>'+
						'<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>'+
					'</a>'+
						'<ul class="sub-menu treeview-menu sub_menu_'+data.result.items[i].USER_MENU_INDEX+'"></ul>'+
					'</li>');
			}//end for main menu
							
							
			//parsing sub-menu
			for(i=0;i<data.result.items.length;i++){ 
				if(data.result.items[i].SUB==null){ }else{	
					$(".sub_menu_"+data.result.items[i].USER_MENU_INDEX).empty();
					for(j=0;j<data.result.items[i].SUB.length;j++){ //alert(data.result.items[i].SUB[j].USER_PRIVILEGES_MASTER_NAME);
						$(".sub_menu_"+data.result.items[i].USER_MENU_INDEX).append('<li><a href="'+data.result.items[i].SUB[j].USER_MENU_URL+'" ><i class="fa fa-circle-o"></i>'+data.result.items[i].SUB[j].USER_PRIVILEGES_MASTER_NAME+'</a></li>');
					}//end for
				}//end if	
			}//end for sub-menu
							
							
			//aplikasi aktif
			$("#ActiveApp").html('<img src="https://cache.niagain.com/niaga/images/brand-asset/mascot-mini.png" alt="logo" style="height:30px;"> '+data.result.summary.aplikasi_aktif);
			$("title").html(data.result.summary.aplikasi_aktif+' - APIs');
			$(".PERSONAL_NAME").html(data.result.summary.user_login.PERSONAL_NAME);
			$(".PERSONAL_FOTO").attr('src',data.result.summary.user_login.PROPERTIES.profile.FOTO);
			$(".USER_REGISTER_DATE").html(data.result.summary.user_login.PROPERTIES.profile.USER_REGISTER_DATE_FORMAT);
							
	}else if(data.respon.pesan=="gagal"){
		//no act
		alert(data.respon.text_msg);
	}
					
}
function appMenu(appsID){
	var params ={
		//parameter kepala sebagai parameter informasi dan authentikasi
		headers:{
				aplikasi:"sistem",
				format:"json",
				case:"user__json_menu_list",  //module: user  , case module : json_nonlogin_auth_login
				data_http:$.cookie('data_http'), //wajib ketika akses data menggunakan autentikasi
				token_http:$.cookie('token_http'), //wajib ketika akses data menggunakan autentikasi
				sistem_data_gid:PlatformConfig.sistem_data_gid
				},
		//parameter input untuk disimpan ke database atau sebagai filter data	
		contents:{
			USER_APLIKASI_ID:appsID,	
		},
		//parameter kaki untuk halaman dan batas record tampil tiap halaman	
		footers:{
				halaman:"1",
				batas:"10"
				}
	}; //parameter
	var JSONP=new connectJSONP(params,appMenuTheme);
}//end load menu
//end ajax load menu utama


//=== ControlUrl Scope===//
var controlsUrl=function(ahref){
	//jQuery load page
	var loadPage=function (linkTarget){ 
		Pace.restart();
		//$(".loading-page").removeClass("hidden"); //alert(linkTarget);
		$( "#vWcontent" ).load( ""+linkTarget, function( response, status, xhr ) {
			  if ( status == "error" ) {
				var msg = "Sorry but there was an error: ";
				$( "#vWcontent" ).html("<span class='text-danger'>"+ msg + xhr.status + " " + xhr.statusText +"</span>");
			  }
			  //$(".loading-page").addClass("hidden");	
		});
	}//end loadPage()
	
	if(ahref==''){ var url = window.location.href; }else{ var url = ahref; }
	
	var cr=url.search("#");
	var cr2=url.split("#"); 
	if((cr<=1) || (cr2[1]=='')){
		loadPage('aplikasi/index'); //default page
		appMenu('sistem'); //load menu
	}else{
		var targetFile=url.split("="); 
		if(targetFile[1]==''){
			loadPage('aplikasi/index'); //default page
		}else{
			loadPage('aplikasi/'+targetFile[1]);
		}
		var appsID=targetFile[1].split("/"); //alert(appsID[0]);
		appMenu(appsID[0]); //load menu
	}
	
}//end controlsUrl
//=== End ControlUrl Scope===//
CtrlUrl=new controlsUrl('');

//load page after click menu
$("#main-menu").on('click','li ul.sub-menu li a',function(){ var ahref=$(this).attr("href"); controlsUrl(ahref); Pace.restart(); });
//reload page on change address bar
//location.reload();
window.onhashchange = function() { CtrlUrl=new controlsUrl(window.location.href); }
// To make Pace works on Ajax calls
//$(document).ajaxStart(function() { Pace.restart(); });







//$(function ( $ ) {
 
    ///* This is a private declaration, isn't it ? */
    //var settings = {
        //pagesize: 10
    //}
 
    ///* Constructor */
    //$.fn.myPlugin = function (options) {
       
       ///* Call a private method to save the options */
        //setVars( options );
    //}
 
    ///* Private method to save the options to a PRIVATE variable */
    //function setVars(options) {
        //settings = $.extend( {}, options);
    //}
 
    ///* Alert the page size related to the CURRENT instance */
    //$.fn.myPlugin.refresh = function () {
        //alert( settings.pagesize );
    //}
 
//} ) ( jQuery );
//$("#div2").myPlugin.refresh();
