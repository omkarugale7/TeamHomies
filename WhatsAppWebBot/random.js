var s = 'aa';
for (let index = 0; index < 100; index++) {
     var b = Math.floor(Math.random()*100);
     s+= String.fromCharCode(b);
     if(s.length>20)
     {
        s = s.substring(1,19);
     }
     console.log(s);
}