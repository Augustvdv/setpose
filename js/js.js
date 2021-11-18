
function getCookieValue(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
function closeControlsHint() {
    $(".controlshint").fadeOut();
    document.cookie = "controlshint=false; max-age=31536000; path=/;";
}

$(document).ready(function() {
    $("#resrange").next().val(renderer.getPixelRatio() + 'x'); 
    $("#resrange").val(renderer.getPixelRatio()); 
    $("#fovrange").next().val(30); 
    $("#fovrange").val(30); 
});

$(function() {
    $('.lazy').Lazy();
});

$(".setposebtn").each(function() {
    $(this).on('click', function() {
        setPostureStr(posecodes[$(this).data("posecode")]);
    });
});

if(getCookieValue("controlshint") != "false") {
    $(".controlshint").css("display", "inline-block");
}
$(".controlshint").click(function() {
    closeControlsHint();
});

ground = new THREE.Mesh( new THREE.CircleGeometry(80, 64), new THREE.MeshPhongMaterial({ color: '#d9d9d9', shininess: 1 }) );
ground.receiveShadow = true;
ground.position.y = -29.5;
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

$("#toggle-floor").change(function() {
    if(this.checked) {
        scene.add(ground);
        renderer.render(scene, camera);
    } else {
        scene.remove(ground);
        renderer.render(scene, camera);
    }
});

$("#toggle-shadow").change(function() {
    if(this.checked) {
        light.castShadow = true;
        renderer.render(scene, camera);
    } else {
        light.castShadow = false;
        renderer.render(scene, camera);
    }
});

$("#fovrange").on("change mousemove", function() { 
    $(this).next().val($(this).val()); 
    camera.fov = $(this).val();
    camera.updateProjectionMatrix();
});

$("#resrange").on("change mousemove", function() { 
    $(this).next().val($(this).val() + 'x'); 
    renderer.setPixelRatio($(this).val());
    renderer.render(scene, camera); 
});

$("#lightrange").on("change mousemove", function() { 
    $(this).next().val($(this).val()); 
    light.intensity = $(this).val();
    renderer.render(scene, camera); 
});

$("#backcolor").on("input change", function() { 
    scene.background = new THREE.Color($(this).val());
    renderer.render(scene, camera); 
});

$("#headsizerange").on("change mousemove", function() { $(this).next().val($(this).val()); model.head.scale.set($(this).val(),$(this).val(),$(this).val()); renderer.render(scene, camera); });
$("#torsosizerange").on("change mousemove", function() { $(this).next().val($(this).val()); model.torso.scale.set($(this).val(),model.torso.scale["y"],model.torso.scale["z"]); renderer.render(scene, camera); });
$("#torsowidthrange").on("change mousemove", function() { $(this).next().val($(this).val()); model.torso.scale.set(model.torso.scale["x"],model.torso.scale["y"],$(this).val()); renderer.render(scene, camera); });
$("#torsoheightrange").on("change mousemove", function() { $(this).next().val($(this).val()); model.torso.scale.set(model.torso.scale["x"],$(this).val(),model.torso.scale["z"]); renderer.render(scene, camera); });
$("#armlsizerange").on("change mousemove", function() { $(this).next().val($(this).val()); model.l_arm.scale.set($(this).val(),$(this).val(),$(this).val()); renderer.render(scene, camera); });
$("#armrsizerange").on("change mousemove", function() { $(this).next().val($(this).val()); model.r_arm.scale.set($(this).val(),$(this).val(),$(this).val()); renderer.render(scene, camera); });
$("#leglsizerange").on("change mousemove", function() { $(this).next().val($(this).val()); model.l_leg.scale.set($(this).val(),$(this).val(),$(this).val()); renderer.render(scene, camera); });
$("#legrsizerange").on("change mousemove", function() { $(this).next().val($(this).val()); model.r_leg.scale.set($(this).val(),$(this).val(),$(this).val()); renderer.render(scene, camera); });

$(".opensettingsbtn, .hidepanelbtn").on('click', function() {
    if ($(window).width() < 759) {
        if($(".panel").hasClass("expanded")){ 
            $(".panel").removeClass("expanded");
            $("html").css("overflow-y", "auto");
        } else {
            $(".panel").addClass("expanded");
            $("html").css("overflow-y", "hidden");
        }
    } else {        
        if($(".panel").hasClass("hidden")){ 
            $(".panel, .hidepanelbtn").removeClass("hidden");
        } else {
            $(".panel, .hidepanelbtn").addClass("hidden");
        }
    }
});

$('.setposebtn[data-prop]').each(function(){
    $(this).append('<img src="https://fakeclients.com/imgs/information-outline.svg" class="presetinfoicon"><div class="presetinfo">Use this preset in combination with the '+ $(this).data("prop") +' prop</div><span class="presetinfopointer"></span>');
});

$("#ss").on('click', function() {
    var image = renderer.domElement.toDataURL("image/png").replace("image/png", "image/octet-stream");
    $("#ssimg").attr("href", image);
    $("#ssimgprev").attr("src", image);
    //$("#ssimg")[0].click();
    //window.location.href=image;
});

$("#undo").on('click', function() {
    undo();
});