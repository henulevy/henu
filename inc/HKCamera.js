﻿var path = "";
var FileName = "";
//获取图片
function GetImage1() {
    ChangeStatus(1);
    //path = "D:/OCXJPEGCaptureFiles";
//    path = "E:\yunpantongbu\辅助程序\河大谢教授\海康威视摄像头调用\OCXJPEGCaptureFiles";
    path = "../OCXJPEGCaptureFiles";
    FileName = Date.parse(new Date());
    //if (m_iPlay == 1) {
    if (m_bDVRControl.JPEGCapturePicV23(1, 2, 2, path, 0, FileName)) {
        LogMessage("抓JPEG图成功！");
    }
    else {
        LogMessage("抓JPEG图失败！");
    }
    //}
    //else {
    //    LogMessage("请先预览！");
    //}
    //alert(FileName);
}


//全局变量定义
var m_iNowChanNo = -1;                           //当前通道号
var m_iLoginUserId = -1;                         //注册设备用户ID
var m_iChannelNum = -1;							 //模拟通道总数
var m_bDVRControl = null;						 //OCX控件对象
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
        var DevIP = $("#DevIP" + index + "").val();
        var DevPort = $("#DevPort" + index + "").val();
        var DevUser = $("#DevUser" + index + "").val();
        var DevPwd = $("#DevPwd" + index + "").val();

        $("#DevIP").val(DevIP);
        $("#DevPort").val(DevPort);
        $("#DevUser").val(DevUser);
        $("#DevPwd").val(DevPwd);
        if (document.getElementById("HIKOBJECT1").object == null) {
            alert("请先下载控件并注册！");
            m_bDVRControl = null;
        }
        else {
            m_bDVRControl = document.getElementById("HIKOBJECT1");
            ChangeStatus(1);
            ArrangeWindow(1);
            ButtonPress("LoginDev");
            ButtonPress("getDevName");
            ButtonPress("getDevChan");
            ButtonPress("Preview:start");
        }
     }, 1000);
    
}



/*************************************************
  Function:    	onload
  Description:	页面加载完后判断系统日期是否在1971-2037范围
  Input:        无
  Output:      	无
  Return:		无
*************************************************/
window.onload = function () {
    getCamConfig();
    //b = setInterval("fun()", 1000);
    var myDate = new Date();
    var iYear = myDate.getFullYear();
    //if (iYear < 1971 || iYear > 2037) {
    //    alert("为了正常使用本软件，请将系统日期年限设置在1971-2037范围内！");
    //    //parent.location.href = "../login.php";
    //}
    if (document.getElementById("HIKOBJECT1").object == null) {
        alert("请先下载控件并注册！");
        m_bDVRControl = null;
    }
    else {
        m_bDVRControl = document.getElementById("HIKOBJECT1");
        ChangeStatus(1);
        ArrangeWindow(1);
        ButtonPress("LoginDev");
        ButtonPress("getDevName");
        ButtonPress("getDevChan");
        ButtonPress("Preview:start");
    }
}
function fun() {
    //var CVR_IDCard = document.getElementById("CVR_IDCard");
    //var strReadResult = CVR_IDCard.ReadCard();
    //var CardNo = CVR_IDCard.CardNo;//身份证号
    //if (CardNo != "") {
    //    //拍照
    //    GetImage1();
    //    var img = FileName + ".jpeg";
    //    $.ajaxSetup({
    //        cache: false,//设置成false将不会从浏览器缓存读取信息
    //        async: false
    //    });
    //    //url = '@Url.Action("CheckFace")';
    //    $.post("http://192.168.1.221/QDFace/Index.aspx", { "para": "1", "CardNo": CardNo + "," + img }, function (result) {
    //        CVR_IDCard.CardNo = "";
    //        //document.getElementById("res").innerHTML = "";
    //        if (result == "-1") {
    //            $("#res").css("color", "red");
    //            $("#res").css("font-size", "xx-large");
    //            document.getElementById("res").innerHTML = "未通过";
    //            document.getElementById("imgPic").src = "Content/1.png";
    //            alert("系统中不存在此人，请管理员确认!");
    //        } else if (result == "-2") {
    //            $("#res").css("color", "red");
    //            $("#res").css("font-size", "xx-large");
    //            document.getElementById("res").innerHTML = "未通过";
    //            document.getElementById("imgPic").src = "Content/1.png";
    //            alert("此人已被添加到黑名单中，禁止进入！");
    //        } else {
    //            var arr = result.split(',');
    //            alert(parseFloat(arr[1]));
    //            if (parseFloat(arr[1]) > 0.5) {
    //                document.getElementById("imgPic1").src = "data:image/jpeg;base64," + arr[0];
    //                //进门审核结果
    //                //document.getElementById("res").innerHTML = "通过";
    //                //$("#res").css("color", "green");
    //                //$("#res").css("font-size", "xx-large");
    //            } else {
    //                document.getElementById("imgPic1").src = "data:image/jpeg;base64," + arr[0];
    //                //进门审核结果
    //                document.getElementById("res").innerHTML = "未通过";
    //                $("#res").css("color", "red");
    //                $("#res").css("font-size", "xx-large");
    //            }
    //            $("#enterid").empty();
    //            $("#enterid").append(CardNo);
    //            $("#entersame").empty();
    //            $("#entersame").append(arr[1]);
    //        }
    //    });
    //}
}
function clearword() {
    $("#res").empty();
    document.getElementById("imgPic").src = "Content/1.png";
    document.getElementById("IfImage").src = "Content/1.png";
}
//document.oncontextmenu = rightclick;
/*************************************************
  Function:    	rightclick
  Description:	网页禁用右键
  Input:        无
  Output:      	无
  Return:		bool:   true false
*************************************************/
function rightclick() {
    return false;
}
/*************************************************
  Function:    	rightclick
  Description:	网页禁用右键
  Input:        无
  Output:      	无
  Return:		bool:   true false
*************************************************/
function ButtonPress(sKey) {
    try {
        switch (sKey) {
            case "LoginDev":
                {
                    m_iLoginUserId = m_bDVRControl.Login($("#DevIP").val(), $("#DevPort").val(), $("#DevUser").val(), $("#DevPwd").val());

                    if (m_iLoginUserId == -1) {
                        LogMessage("注册失败！");
                    }
                    else {
                        //LogMessage("注册成功！");
                        //for (var i = 2; i <= 4; i++) {
                        document.getElementById("HIKOBJECT1").SetUserID(m_iLoginUserId);
                        //}
                    }
                    break;
                }
            case "LogoutDev":
                {
                    if (m_bDVRControl.Logout()) {
                        LogMessage("注销成功！");
                    }
                    else {
                        LogMessage("注销失败！");
                    }
                    break;
                }
            case "getDevName":
                {
                    var szDecName = m_bDVRControl.GetServerName();
                    //szDecName = szDecName.replace(/\s/g,"&nbsp;"); 
                    if (szDecName == "") {
                        LogMessage("获取名称失败！");
                        szDecName = "Embedded Net DVR";
                    }
                    else {
                        LogMessage("获取名称成功！");
                    }
                    //document.getElementById("DeviceName").value = szDecName;
                    break;
                }
            case "getDevChan":
                {
                    szServerInfo = m_bDVRControl.GetServerInfo();
                    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = "false"
                    xmlDoc.loadXML(szServerInfo)
                    m_iChannelNum = parseInt(xmlDoc.documentElement.childNodes[0].childNodes[0].nodeValue);
                   
                    if (m_iChannelNum < 1) {
                        LogMessage("获取通道失败！");
                    }
                    else {
                        LogMessage("获取通道成功！");
                        document.getElementById("ChannelList").length = 0; //先清空下拉列表
                        for (var i = 0; i < m_iChannelNum; i++) {
                            var szChannelName = m_bDVRControl.GetChannelName(i);
                            if (szChannelName == "") {
                                szChannelName = "通道" + (i + 1);
                            }
                            document.getElementById("ChannelList").options.add(new Option(szChannelName, i));
                        }
                    }
                    break;
                }
            case "Preview:start":
                {
                    m_iNowChanNo = parseInt(document.getElementById("ChannelList").value);
                    //m_iNowChanNo = 1;
                    if (m_iNowChanNo > -1) {
                        if (m_iPlay == 1) {
                            m_bDVRControl.StopRealPlay();
                        }

                        var bRet = m_bDVRControl.StartRealPlay(m_iNowChanNo, m_iProtocolType, m_iStreamType);
                        if (bRet) {
                            LogMessage("预览通道" + (m_iNowChanNo + 1) + "成功！");
                            m_iPlay = 1;
                        }
                        else {
                            LogMessage("预览通道" + (m_iNowChanNo + 1) + "失败！");
                        }
                    }
                    else {
                        LogMessage("请选择通道号！");
                    }
                    break;
                }
            case "Preview:stop":
                {

                    if (m_bDVRControl.StopRealPlay()) {
                        LogMessage("停止预览成功！");
                        m_iPlay = 0;
                    }
                    else {
                        LogMessage("停止预览失败！");
                    }
                    break;
                }
            case "CatPic:bmp":
                {
                    if (m_iPlay == 1) {
                        if (m_bDVRControl.BMPCapturePicture("C:/OCXBMPCaptureFiles", 1)) {
                            LogMessage("抓BMP图成功！");
                        }
                        else {
                            LogMessage("抓BMP图失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "CatPic:jpeg":
                {
                    if (m_iPlay == 1) {
                        if (m_bDVRControl.JPEGCapturePicV23(1, 2, 0, "C:/OCXJPEGCaptureFiles", 1, "ss.jpeg")) {
                            LogMessage("抓JPEG图成功！");
                        }
                        else {
                            LogMessage("抓JPEG图失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "Record:start":
                {
                    if (m_iPlay == 1) {
                        if (m_iRecord == 0) {
                            if (m_bDVRControl.StartRecord("C:/OCXRecordFiles")) {
                                LogMessage("开始录像成功！");
                                m_iRecord = 1;
                            }
                            else {
                                LogMessage("开始录像失败！");
                            }
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "Record:stop":
                {
                    if (m_iRecord == 1) {
                        if (m_bDVRControl.StopRecord(1)) {
                            LogMessage("停止录像成功！");
                            m_iRecord = 0;
                        }
                        else {
                            LogMessage("停止录像失败！");
                        }
                    }
                    break;
                }
            case "talk:start":
                {
                    if (m_iLoginUserId > -1) {
                        if (m_iTalk == 0) {
                            if (m_bDVRControl.StartTalk(1)) {
                                LogMessage("开始对讲成功！");
                                m_iTalk = 1;
                            }
                            else {
                                var dRet = m_bDVRControl.GetLastError();
                                LogMessage("开始对讲失败！错误号：" + dRet);

                            }
                        }
                    }
                    else {
                        LogMessage("请注册设备！");
                    }
                    break;
                }
            case "talk:stop":
                {
                    if (m_iTalk == 1) {
                        if (m_bDVRControl.StopTalk()) {
                            LogMessage("停止对讲成功！");
                            m_iTalk = 0;
                        }
                        else {
                            LogMessage("停止对讲失败！");
                        }
                    }
                    break;
                }
            case "voice:start":
                {
                    if (m_iPlay == 1) {
                        if (m_iVoice == 0) {
                            if (m_bDVRControl.OpenSound(1)) {
                                LogMessage("打开声音成功！");
                                m_iVoice = 1;
                            }
                            else {
                                LogMessage("打开声音失败！");
                            }
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "voice:stop":
                {
                    if (m_iVoice == 1) {
                        if (m_bDVRControl.CloseSound(1)) {
                            LogMessage("关闭声音成功！");
                            m_iVoice = 0;
                        }
                        else {
                            LogMessage("关闭声音失败！");
                        }
                    }
                    break;
                }
            case "PTZ:stop":
                {
                    if (m_iPlay == 1) {
                        if (m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed)) {
                            LogMessage("停止PTZ成功！");
                            m_iAutoPTZ = 0;
                        }
                        else {
                            LogMessage("停止PTZ失败！");
                        }
                    }
                    break;
                }
            case "PTZ:leftup":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(13, m_iPTZSpeed)) {
                            LogMessage("PTZ左上成功！");
                        }
                        else {
                            LogMessage("PTZ左上失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "PTZ:rightup":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(14, m_iPTZSpeed)) {
                            LogMessage("PTZ右上成功！");
                        }
                        else {
                            LogMessage("PTZ右上失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "PTZ:up":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(0, m_iPTZSpeed)) {
                            LogMessage("PTZ上成功！");
                        }
                        else {
                            LogMessage("PTZ上失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "PTZ:left":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(2, m_iPTZSpeed)) {
                            LogMessage("PTZ向左成功！");
                        }
                        else {
                            LogMessage("PTZ向左失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "PTZ:right":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(3, m_iPTZSpeed)) {
                            LogMessage("PTZ向右成功！");
                        }
                        else {
                            LogMessage("PTZ向右失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "PTZ:rightdown":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(16, m_iPTZSpeed)) {
                            LogMessage("PTZ右下成功！");
                        }
                        else {
                            LogMessage("PTZ右下失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "PTZ:leftdown":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(15, m_iPTZSpeed)) {
                            LogMessage("PTZ左下成功！");
                        }
                        else {
                            LogMessage("PTZ左下失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "PTZ:down":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(1, m_iPTZSpeed)) {
                            LogMessage("PTZ向下成功！");
                        }
                        else {
                            LogMessage("PTZ向下失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "PTZ:auto":
                {
                    if (m_iPlay == 1) {
                        if (m_bDVRControl.PTZCtrlStart(10, m_iPTZSpeed)) {
                            LogMessage("PTZ自转成功！");
                            m_iAutoPTZ = 1;
                        }
                        else {
                            LogMessage("PTZ自转失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "zoom:in":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(4, m_iPTZSpeed)) {
                            LogMessage("焦距拉近成功！");
                        }
                        else {
                            LogMessage("焦距拉近失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "zoom:out":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(5, m_iPTZSpeed)) {
                            LogMessage("焦距拉远成功！");
                        }
                        else {
                            LogMessage("焦距拉远失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "focus:in":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(6, m_iPTZSpeed)) {
                            LogMessage("聚焦拉近成功！");
                        }
                        else {
                            LogMessage("聚焦拉近失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "focus:out":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(7, m_iPTZSpeed)) {
                            LogMessage("聚焦拉远成功！");
                        }
                        else {
                            LogMessage("聚焦拉远失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "iris:in":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(8, m_iPTZSpeed)) {
                            LogMessage("光圈大成功！");
                        }
                        else {
                            LogMessage("光圈大失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "iris:out":
                {
                    if (m_iPlay == 1) {
                        if (m_iAutoPTZ == 1) {
                            m_bDVRControl.PTZCtrlStop(10, m_iPTZSpeed);
                            m_iAutoPTZ = 0;
                        }
                        if (m_bDVRControl.PTZCtrlStart(9, m_iPTZSpeed)) {
                            LogMessage("光圈小成功！");
                        }
                        else {
                            LogMessage("光圈小失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "getImagePar":
                {
                    if (m_iPlay == 1) {
                        var szXmlInfo = m_bDVRControl.GetVideoEffect();
                        if (szXmlInfo != "") {
                            var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                            xmlDoc.async = "false"
                            xmlDoc.loadXML(szXmlInfo)
                            document.getElementById("PicLight").value = xmlDoc.documentElement.childNodes[0].childNodes[0].nodeValue;
                            document.getElementById("PicContrast").value = xmlDoc.documentElement.childNodes[1].childNodes[0].nodeValue;
                            document.getElementById("PicSaturation").value = xmlDoc.documentElement.childNodes[2].childNodes[0].nodeValue;
                            document.getElementById("PicTonal").value = xmlDoc.documentElement.childNodes[3].childNodes[0].nodeValue;
                            LogMessage("获取图像参数成功！");
                        }
                        else {
                            LogMessage("获取图像参数失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "setImagePar":
                {
                    if (m_iPlay == 1) {
                        var iL = parseInt(document.getElementById("PicLight").value);
                        var iC = parseInt(document.getElementById("PicContrast").value);
                        var iS = parseInt(document.getElementById("PicSaturation").value);
                        var iT = parseInt(document.getElementById("PicTonal").value);
                        var bRet = m_bDVRControl.SetVideoEffect(iL, iC, iS, iT);
                        if (bRet) {
                            LogMessage("设置图像参数成功！");
                        }
                        else {
                            LogMessage("设置图像参数失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "setPreset":
                {
                    if (m_iPlay == 1) {
                        var iPreset = parseInt(document.getElementById("Preset").value);
                        var bRet = m_bDVRControl.PTZCtrlSetPreset(iPreset);
                        if (bRet) {
                            LogMessage("设置预置点成功！");
                        }
                        else {
                            LogMessage("设置预置点失败！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            case "goPreset":
                {
                    if (m_iPlay == 1) {
                        var iPreset = parseInt(document.getElementById("Preset").value);
                        var bRet = m_bDVRControl.PTZCtrlGotoPreset(iPreset);
                        if (bRet) {
                            LogMessage("调用预置点成功！");
                        }
                        else {
                            LogMessage("调用预置点成功！");
                        }
                    }
                    else {
                        LogMessage("请先预览！");
                    }
                    break;
                }
            default:
                {
                    //Record:start   setPreset
                    break;
                }
        }		//switch  
    }
    catch (err) {
        alert(err);
    }
}
/*************************************************
  Function:    	LogMessage
  Description:	写执行结果日志
  Input:        msg:日志
  Output:      	无
  Return:		无
*************************************************/
function LogMessage(msg) {
    var myDate = new Date();
    var szNowTime = myDate.toLocaleString();                   //获取日期与时间
    document.getElementById("logContent").innerHTML = szNowTime + " --> " + msg + "<br>" + document.getElementById("logContent").innerHTML;
}
/*************************************************
Function:		ArrangeWindow
Description:	画面分割为几个窗口
Input:			x : 窗口数目			
Output:			无
return:			无				
*************************************************/
function ArrangeWindow(x) {
    var iMaxWidth = document.getElementById("OCXBody").offsetWidth;
    var iMaxHeight = document.getElementById("OCXBody").offsetHeight;
    //for(var i = 1; i <= 4; i ++)
    //{
    //	if(i <= x)
    //	{
    document.getElementById("NetPlayOCX1").style.display = "";
    //}
    //else
    //{
    //document.getElementById("NetPlayOCX1").style.display = "none";	
    //	}
    //}
    var d = Math.sqrt(x);
    var iWidth = iMaxWidth / d;
    var iHight = iMaxHeight / d;
    //for(var j = 1; j <= x; j ++)
    //{
    document.getElementById("NetPlayOCX1").style.width = iWidth; 
    document.getElementById("NetPlayOCX1").style.height = iHight; 
    //}
    if (x == 1) {

    }
    else if (x == 4) {

    }
    else {
        //	
    }
}
/*************************************************
Function:		ChangeStatus
Description:	选中窗口时，相应通道的状态显示
Input:			iWindowNum : 	选中窗口号		
Output:			无
return:			无				
*************************************************/
function ChangeStatus(iWindowNum) {
    m_bDVRControl = document.getElementById("HIKOBJECT" + iWindowNum);
    //for(var i = 1; i <= 4; i ++)
    //{
    //if(i == iWindowNum)
    //{
    document.getElementById("NetPlayOCX1").style.border = "1px solid #00F";
    //}
    //else
    //{
    //	document.getElementById("NetPlayOCX1" ).style.border = "1px solid #EBEBEB";	
    //}
    //}
    LogMessage("当前选中窗口" + iWindowNum);
}

function GetLastError() {
    var num = m_bDVRControl.GetLastError();
    alert(num);
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
