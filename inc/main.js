// JavaScript Document
var ServerAddr = "http://localhost:13871/VirSystem/";
var int = null;
var getDataTimer = setInterval("getData()", 1000);
var signX = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1), signY = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
//生成随机数，每次Ajax请求url不一样，刷新数据，防止IE浏览器使用缓存数据
function RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

function cnvs_getCoordinates(e)
{
    x=e.clientX;
    y=e.clientY;
    document.getElementById("xycoordinates").style.left=(x+40)+"px";
    document.getElementById("xycoordinates").style.top= y+"px"; 
    document.getElementById("xycoordinates").innerHTML="Coordinates: (" + x + "," + y + ")";
}
 
function cnvs_clearCoordinates()
{
    document.getElementById("xycoordinates").innerHTML="";
}

function initCar() {
    var i = 0;
    for (i = 1; i <= 10; i++) {
        document.getElementById("apDiv" + (i + 5) + "").style.visibility = "hidden";
    }
    
    for (i = 1; i <= 10; i++) {
        if ($("#Show" + i+"").val() == "1") {
            document.getElementById("apDiv" + (i + 5) + "").style.visibility = "visible";
        }
    }
}

function MoveCar() {
    var i = 0;
    for (i = 0; i < 10; i++) {
        var x = 0;
        var y = 0;
        x = $("#Posx" + (i + 1) + "").val();
        y = $("#Posy" + (i + 1) + "").val();
//        switch (i) {
//            case 0:                
//                x = $("#Posx1").val();
//                y = $("#Posy1").val();
//                break;
//            case 1:
//                x = $("#Posx2").val();
//                y = $("#Posy2").val();
//                break;
//            case 2:
//                x = $("#Posx3").val();
//                y = $("#Posy3").val();
//                break;
//            case 3:
//                x = $("#Posx4").val();
//                y = $("#Posy4").val();
//                break;
//            case 4:
//                x = $("#Posx5").val();
//                y = $("#Posy5").val();
//                break;
//            case 5:
//                x = $("#Posx6").val();
//                y = $("#Posy6").val();
//                break;
//            case 6:
//                x = $("#Posx7").val();
//                y = $("#Posy7").val();
//                break;
//            case 7:
//                x = $("#Posx8").val();
//                y = $("#Posy8").val();
//                break;
//            case 8:
//                x = $("#Posx9").val();
//                y = $("#Posy9").val();
//                break;
//            case 9:
//                x = $("#Posx10").val();
//                y = $("#Posy10").val();
//                break;
//        }
        if (document.getElementById("apDiv" + (6 + i) + "").offsetLeft >= 602) {
            signX[i] = -1;
        }
        if (document.getElementById("apDiv" + (6 + i) + "").offsetTop >= 1053) {
            signY[i] = -1;
        }
        if (document.getElementById("apDiv" + (6 + i) + "").offsetLeft <= 102) {
            signX[i] = 1;
        }
        if (document.getElementById("apDiv" + (6 + i) + "").offsetTop <= 102) {
            signY[i] = 1;
        }
        x = x * signX[i];
        y = y * signY[i];
        
        document.getElementById("apDiv" + (6 + i) + "").style.left = (parseInt(document.getElementById("apDiv" + (6 + i) + "").offsetLeft) + x) + "px";
        document.getElementById("apDiv" + (6 + i) + "").style.top = (parseInt(document.getElementById("apDiv" + (6 + i) + "").offsetTop) + y) + "px";
//        alert(document.getElementById("apDiv" + (6 + i) + "").offsetLeft);
    }
}

function startFangZhen() {
    initCar();
    
	if(int!=null)	
		window.clearInterval(int);
	int = self.setInterval("MoveCar()", 1000);
	
}

function connectFangZhen() {
    if (getDataTimer == null) {
        getDataTimer = setInterval("getData()", 1000);
    }
}

function closeConnectFangZhen() {
    window.clearInterval(getDataTimer);
    getDataTimer = null;
}
  function mySuccess(data) {
      $.each(data.root, function (index, item) {
          switch (index) {
              case 0:
                  $("#Show1").val(item.Show);
                  $("#Posx1").val(item.Posx);
                  $("#Posy1").val(item.Posy);
                  break;
              case 1:
                  $("#Show2").val(item.Show);
                  $("#Posx2").val(item.Posx);
                  $("#Posy2").val(item.Posy);
                  break;
              case 2:
                  $("#Show3").val(item.Show);
                  $("#Posx3").val(item.Posx);
                  $("#Posy3").val(item.Posy);
                  break;
              case 3:
                  $("#Show4").val(item.Show);
                  $("#Posx4").val(item.Posx);
                  $("#Posy4").val(item.Posy);
                  break;
              case 4:
                  $("#Show5").val(item.Show);
                  $("#Posx5").val(item.Posx);
                  $("#Posy5").val(item.Posy);
                  break;
              case 5:
                  $("#Show6").val(item.Show);
                  $("#Posx6").val(item.Posx);
                  $("#Posy6").val(item.Posy);
                  break;
              case 6:
                  $("#Show7").val(item.Show);
                  $("#Posx7").val(item.Posx);
                  $("#Posy7").val(item.Posy);
                  break;
              case 7:
                  $("#Show8").val(item.Show);
                  $("#Posx8").val(item.Posx);
                  $("#Posy8").val(item.Posy);
                  break;
              case 8:
                  $("#Show9").val(item.Show);
                  $("#Posx9").val(item.Posx);
                  $("#Posy9").val(item.Posy);
                  break;
              case 9:
                  $("#Show10").val(item.Show);
                  $("#Posx10").val(item.Posx);
                  $("#Posy10").val(item.Posy);
                  break;
          }

      });
  }

  function getData() {
      $.ajax({
          type: "get",
          url: ServerAddr + "DataSuply.aspx?id=" + RandomNumBoth(1, 30000),
          data: { id: RandomNumBoth(1, 30000), item: "x", carIndex: 1 },
          dataType: "json",
          success: function (data) {
              mySuccess(data);
          }
      })
  }

  function TabSelect(index) {
     //$(this).addClass("selected").siblings().removeClass("selected");
      var i = 0;
      for (i = 0; i < 3; i++) {
          if (i == index) {
              $("#tab_conf_item" + (i + 1) + "").addClass("selected");
          } else {
              $("#tab_conf_item" + (i + 1) + "").removeClass("selected");
          }
      }
      $('div.tab_box div').eq(index).show().siblings().hide();
      $("#ConfigSave").show();

 }

 function ConfigSave() {
    var SimuTime = $("#SimuTime").val();
    var SimuStep = $("#SimuStep").val();
    var DDLVehicleNumber = $("#DDLVehicleNumber").val();
    var DDLMetric = $("#DDLMetric").val();

    var VClass = $("#VClass").val();
    var LCModel = $("#LCModel").val();
    var CFModel = $("#CFModel").val();
    var Probability = $("#Probability").val();

    var TransmissionRange = $("#TransmissionRange").val();
    var NumberofPackets = $("#NumberofPackets").val();
    var PacketSize = $("#PacketSize").val();
    var PacketInterval = $("#PacketInterval").val();

    var postData = "{";
    postData += "SimuTime=" + SimuTime;
    postData += ",SimuStep=" + SimuStep;
    postData += ",DDLVehicleNumber=" + DDLVehicleNumber;
    postData += ",DDLMetric=" + DDLMetric;
    postData += ",VClass=" + VClass;
    postData += ",LCModel=" + LCModel;
    postData += ",CFModel=" + CFModel;
    postData += ",Probability=" + Probability;
    postData += ",TransmissionRange=" + TransmissionRange;
    postData += ",NumberofPackets=" + NumberofPackets;
    postData += ",PacketSize=" + PacketSize;
    postData += ",PacketInterval=" + PacketInterval;
    postData += "}";
//    postData = "{ \"url\": \"http:baidu.com\" }";

    $.ajax({
        type: "post",
        url: ServerAddr + "ConfigService.aspx?id=" + RandomNumBoth(1, 30000),
        data: postData,
        dataType: "text",
        success: function (data) {
            confirm(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
            alert(XMLHttpRequest.status);
        }
    })
  }