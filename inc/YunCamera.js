
//全局变量定义
var m_iNowChanNo = -1;                           //当前通道号
var m_iLoginUserId = -1;                         //注册设备用户ID
var m_iChannelNum = -1; 						 //模拟通道总数
var m_bDVRControl = null; 					 //OCX控件对象
var m_iProtocolType = 0;                         //协议类型，0 – TCP， 1 - UDP
var m_iStreamType = 0;                           //码流类型，0 表示主码流， 1 表示子码流
var m_iPlay = 1;                                 //当前是否正在预览
var m_iRecord = 0;                               //当前是否正在录像
var m_iTalk = 0;                                 //当前是否正在对讲 
var m_iVoice = 0;                                //当前是否打开声音
var m_iAutoPTZ = 0;                              //当前云台是否正在自转
var m_iPTZSpeed = 4;                             //云台速度
var b = null;
function ConnectCam(index) {
    getCamConfig();
    setTimeout(function () {        
//        player.pause();
        var DevIP = $("#DevIP" + index + "").val();
        var DevPort = $("#DevPort" + index + "").val();
        var DevUser = $("#DevUser" + index + "").val();
        var DevPwd = $("#DevPwd" + index + "").val();

        $("#DevIP").val(DevIP);
        $("#DevPort").val(DevPort);
        $("#DevUser").val(DevUser);
        $("#DevPwd").val(DevPwd);

        var content = "<video id=\"mycamera\" poster=\"autoplay\">";
        content += "<source src=\"" + $("#DevIP").val() + "\" type=\"\" />";
        content += "<source src=\"" + $("#DevPort").val() + "\" type=\"application/x-mpegURL\" />";
        content += "</video>";
//        $("#mycamera").children("first").attr("src",$("#DevIP").val());
//        $("#mycamera").children("last").attr("src",$("#DevPort").val());
        $("#cameraDiv").html(content);
//        alert($("#cameraDiv").html());
        var player = new EZUIPlayer('mycamera');
        player.on('error', function () {
            console.log('error');
        });
        player.on('play', function () {
            console.log('play');
        });
        player.on('pause', function () {
            console.log('pause');
        });
    }, 3000);

}

function myCamSuccess(data) {
    $.each(data.Camera, function (index, item) {
        switch (index) {
            case 0:
                $("#DevIP1").val(item.DevIP);
                $("#DevPort1").val(item.DevPort);
                $("#DevUser1").val(item.DevUser);
                $("#DevPwd1").val(item.DevPwd);
                break;
            case 1:
                $("#DevIP2").val(item.DevIP);
                $("#DevPort2").val(item.DevPort);
                $("#DevUser2").val(item.DevUser);
                $("#DevPwd2").val(item.DevPwd);
                break;
            case 2:
                $("#DevIP3").val(item.DevIP);
                $("#DevPort3").val(item.DevPort);
                $("#DevUser3").val(item.DevUser);
                $("#DevPwd3").val(item.DevPwd);
                break;
            case 3:
                $("#DevIP4").val(item.DevIP);
                $("#DevPort4").val(item.DevPort);
                $("#DevUser4").val(item.DevUser);
                $("#DevPwd4").val(item.DevPwd);
                break;
            case 4:
                $("#DevIP5").val(item.DevIP);
                $("#DevPort5").val(item.DevPort);
                $("#DevUser5").val(item.DevUser);
                $("#DevPwd5").val(item.DevPwd);
                break;
            case 5:
                $("#DevIP6").val(item.DevIP);
                $("#DevPort6").val(item.DevPort);
                $("#DevUser6").val(item.DevUser);
                $("#DevPwd6").val(item.DevPwd);
                break;
        }
    });
}

function getCamConfig() {
    $.ajax({
        type: "get",
        url: ServerAddr + "CamConfig.aspx?id=" + RandomNumBoth(1, 30000),
        data: { id: RandomNumBoth(1, 30000), item: "x", carIndex: 1 },
        dataType: "json",
        success: function (data) {
            myCamSuccess(data);
        }
    })
}

//var getCamConfigTimer = setInterval("getCamConfig()", 1000);
