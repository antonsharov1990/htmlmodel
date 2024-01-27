var milliseconds = -1;
var x0 = 0;
var y0 = 0;
var current_x = 0;
var current_y = 0;
var step_x = 0;
var step_y = 0;
var t2 = 0;

function start()
{
    console.log("start button pressed");
    if (milliseconds == 0 || milliseconds == -1)
    {
        start_timer();
    }
    else
    {
        console.log("milliseconds = " + milliseconds);
    }
}

function move()
{
    if (milliseconds == 1)
    {
        x0 = 1;
        y0 = 1.5;
        step_x = 50;
        step_y = 50;
        t2 = 0;
    }

    var u = document.getElementById("speed").value;
    var a = document.getElementById("angle").value;
    var pi = 3.1415926;
    var g = 9.8;

    var ux = u * Math.cos(a/180*pi);
    var uy0 = u * Math.sin(a/180*pi);
    
    
    var t = milliseconds/1000;
    current_y = y0 + uy0*t - g*t*t/2;
    if (current_y < 0)
    {
        if(t2==0)
        {
            t2 = t-1/1000;
        }

        current_y = 0;
        current_x = x0 + ux * t2;
        milliseconds = 0;
    }
    else
    {
        current_x = x0 + ux * t;
    }

    document.getElementById("ball").style.marginTop = "" + (-current_y*step_y) + "px";
    document.getElementById("ball").style.marginLeft = "" + (current_x*step_x)+ "px";

    console.log("h=" + current_y);

    //y0 = uy0*ty0 + g*ty0*ty0/2
    //g*ty0*ty0/2 + uy0*ty0 - y0 = 0;
    var d = uy0*uy0 + 4 * g/2 * y0;
    var x1 = (-uy0 + Math.sqrt(d))/(2*(g/2));
    //var x2 = (-uy0 - Math.sqrt(d))/(2*(g/2));
    var t1 = uy0/g;
    console.log("t1="+ (t1) + " c.");
    var l = (t1+t1+x1) * ux;

    //document.getElementById("data").textContent = "a=" +a+ " \&deg;\n\r" + "u=" + u + " м/с";
    document.getElementById("data").innerHTML = "a=" +a+ " \&deg; <br>"
     + "u=" + u + " м/с <br>"
     + "y0=" + y0 + " м <br>"
     + "<hr> <br>"
     + "ux = u * Math.cos(a/180*pi) <br>"
     + "ux = " + ux + " м/с <br>"
     + "h = y0 + uy0*t - g*t*t/2 <br>"
     + "uy0 = u * Math.sin(a/180*pi) <br>"
     + "h(t) - функция параболы ветвями вниз. <br> Наибольшее значение достигается при dh/dt = 0 <br>"
     + "dh/dt = uy0 - g * t <br>"
     + "t1 = uy0/g <br>"
     + "t1 = " + t1 + " с <br>"
     + "t2 = 2*t1 + ty0 , где <br>"
     + "ty0 - время падения с начальной высоты  <br>"
     + "y0 = uy0*ty0 + g*ty0*ty0/2 <br>"
     + "ty0 = " + x1 + " с <br>"
     + "Дальность  полёта мячика: <br>"
     + "l = (t1+t1+ty0) * ux <br>"
     + "l = " + l + " м. <br>"
     + "за время " + Math.round((t1+t1+x1)*1000)/1000 + " c. <br>"
     ;

     if (t2 != 0)
     {
        document.getElementById("data").innerHTML += "Экспериментальная дальность полёта <br>"
        + Math.round((current_x-x0)*100)/100 + "м. за время t2=" + t2 + " c.";
        console.log("Рассчет l="+ (l) + " м. за время t2=" + (t1+t1+x1) + " c.");
        console.log("Модель l="+ (current_x-x0) + " м. за время t2=" + t2 + " c.");
     }
     
}

function start_timer()
{
    milliseconds = 0;

    on_tick();
}

function on_tick()
{
    add_millisecond();
    move();

    if(milliseconds > 3600000)
    {
        milliseconds = 0;
        alert('Timer error!');
    }

    if (milliseconds > 0)
    {
        setTimeout(on_tick, 1);
    }
}

function add_millisecond()
{
    milliseconds = milliseconds+1;
    update_timer_text();
}

function update_timer_text()
{
    var current_milliseconds = milliseconds;

    var minutes = "" + Math.floor(current_milliseconds/1000/60);
    var seconds = "" + Math.floor(current_milliseconds/1000)%60;
    var milliseconds_str = "" + current_milliseconds%1000;



    document.getElementById('timer').textContent = "" + get_two_letter(minutes) + ":" + get_two_letter(seconds) + "." + get_three_letter(milliseconds_str);
}

function get_two_letter(current_value)
{
    if (current_value.length < 2)
    {
        return "0" + current_value;
    }
    else
    {
        return "" + current_value;
    }
}

function get_three_letter(current_value)
{
    if(current_value.length == 3)
    {
        return "" + current_value;
    }
    else if(current_value.length == 2)
    {
        return "0" + current_value;
    }
    else //if(millis.length == 1)
    {
        return "00" + current_value;
    }

}