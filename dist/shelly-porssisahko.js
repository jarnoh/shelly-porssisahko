let C_HIST=12,C_ERRC=3,C_ERRD=120,C_DEF={mode:0,m0:{cmd:0},m1:{lim:0},m2:{per:24,cnt:0,lim:-99},vat:24,day:0,night:0,bk:0,err:0,out:0,fh:0,inv:0},a={s:{v:"2.3.1",st:0,cmd:0,chkTs:0,errCnt:0,errTs:0,upTs:0,timeOK:0,configOK:0,fCmdTs:0,p:{ts:0,now:0,low:0,high:0,avg:0}},p:[],h:[],c:C_DEF},l=!1,o=!1;function i(e,t){t-=e;return 0<=t&&t<3600}function c(e){return Math.floor((e?e.getTime():Date.now())/1e3)}function r(e,t,s){let r=e.toString();for(;r.length<t;)r=s?s+r:" "+r;return r}function u(e){return e.getDate()}function f(e,t){var s=new Date;console.log(s.toISOString().substring(11)+": "+(t?t+" - ":""),e)}function b(){var e=new Date;a.s.timeOK=2e3<e.getFullYear()?1:0,!a.s.upTs&&a.s.timeOK&&(a.s.upTs=c(e))}function A(e){Shelly.call("KVS.Get",{key:"porssi-config"},function(t,e,s,r){a.c=t?t.value:{};{t=function(e){a.s.configOK=e?1:0,a.s.chkTs=0,r&&(l=!1,h())};let e=0;if(C_DEF){for(var n in C_DEF)if(void 0===a.c[n])a.c[n]=C_DEF[n],e++;else if("object"==typeof C_DEF[n])for(var o in C_DEF[n])void 0===a.c[n][o]&&(a.c[n][o]=C_DEF[n][o],e++);C_DEF=null,0<e?Shelly.call("KVS.Set",{key:"porssi-config",value:a.c},function(e,t,s,r){r&&r(0===t)},t):t&&t(!0)}else t&&t(!0)}},e)}function h(){var e,t;if(!l)if(l=!0,b(),a.s.configOK)if(function(){let e=new Date,t=!1;t=a.s.timeOK&&(0===a.s.p.ts||u(new Date(1e3*a.s.p.ts))!==u(e)),a.s.errCnt>=C_ERRC&&c(e)-a.s.errTs<C_ERRD?(C_ERRD,c(e),a.s.errTs,t=!1):a.s.errCnt>=C_ERRC&&(a.s.errCnt=0);return t}()){let t=new Date;try{let e=t.getFullYear()+"-"+r(t.getMonth()+1,2,"0")+"-"+r(u(t),2,"0")+"T00:00:00%2b03:00";var s=e.replace("T00:00:00","T23:59:59");let l={url:"https://dashboard.elering.ee/api/nps/price/csv?fields=fi&start="+e+"&end="+s,timeout:5,ssl_ca:"*"};t=null,e=null,Shelly.call("HTTP.GET",l,function(t,e,s){l=null;try{if(0!==e||null==t||200!==t.code||!t.body_b64)throw new Error("conn.err ("+s+") "+JSON.stringify(t));{t.headers=null,s=t.message=null,a.p=[],a.s.p.high=-999,a.s.p.low=999,t.body_b64=atob(t.body_b64),t.body_b64=t.body_b64.substring(t.body_b64.indexOf("\n")+1);let e=0;for(;0<=e;){t.body_b64=t.body_b64.substring(e);var r=[e=0,0];if(0===(e=t.body_b64.indexOf('"',e)+1))break;r[0]=Number(t.body_b64.substring(e,t.body_b64.indexOf('"',e))),e=t.body_b64.indexOf('"',e)+2,e=t.body_b64.indexOf(';"',e)+2,r[1]=Number(t.body_b64.substring(e,t.body_b64.indexOf('"',e)).replace(",",".")),r[1]=r[1]/10*(100+(0<r[1]?a.c.vat:0))/100;var n=new Date(1e3*r[0]).getHours();r[1]+=7<=n&&n<22?a.c.day:a.c.night,a.p.push(r),a.s.p.avg+=r[1],r[1]>a.s.p.high&&(a.s.p.high=r[1]),r[1]<a.s.p.low&&(a.s.p.low=r[1]),e=t.body_b64.indexOf("\n",e)}t=null,a.s.p.avg=0<a.p.length?a.s.p.avg/a.p.length:0;var o=new Date,i=new Date(1e3*a.p[0][0]);if(u(i)!==u(o))throw new Error("date err "+o.toString()+" - "+i.toString());a.s.p.ts=c(o),a.s.p.now=g()}}catch(e){a.s.errCnt+=1,a.s.errTs=c(),a.s.p.ts=0,a.p=[],f(e)}d()})}catch(e){f(e),d()}}else e=new Date,(t=new Date(1e3*a.s.chkTs)).getHours()!==e.getHours()||t.getFullYear()!==e.getFullYear()||0<a.s.fCmdTs&&a.s.fCmdTs-c(e)<0?d():l=!1;else A(!0)}function d(){var e,t,s,r,n=new Date;o=!1;try{a.s.timeOK&&0<a.s.p.ts&&u(new Date(1e3*a.s.p.ts))===u(n)?(a.s.p.now=g(),0===a.c.mode?(o=1===a.c.m0.cmd,a.s.st=1):1===a.c.mode?(o=a.s.p.now<=a.c.m1.lim,a.s.st=o?2:3):2===a.c.mode&&(o=function(){var r=[];for(let s=0;s<24;s+=a.c.m2.per){var n=[];for(let e=s;e<s+a.c.m2.per;e++)n.push(e);let t=0;for(let e=1;e<n.length;e++){var o=n[e];for(t=e-1;0<=t&&a.p[o][1]<a.p[n[t]][1];t--)n[t+1]=n[t];n[t+1]=o}for(let e=0;e<a.c.m2.cnt;e++)r.push(n[e])}let t=c(),s=!1;for(let e=0;e<r.length;e++)if(i(a.p[r[e]][0],t)){s=!0;break}return s}(),a.s.st=o?5:4,!o)&&a.s.p.now<=a.c.m2.lim&&(o=!0,a.s.st=6)):a.s.timeOK?(a.s.st=7,e=1<<n.getHours(),(a.c.bk&e)==e&&(o=!0)):(o=1===a.c.err,a.s.st=8),a.s.timeOK&&(0<a.c.fh&&(t=1<<n.getHours(),(a.c.fh&t)==t)&&(o=!0,a.s.st=10),0<a.s.fCmdTs)&&(0<a.s.fCmdTs-c(n)?(o=!0,a.s.st=9):a.s.fCmdTs=0),a.c.inv&&(o=!o),s=function(e){e&&(a.s.chkTs=c()),l=!1},r="{id:"+a.c.out+",on:"+(o?"true":"false")+"}",Shelly.call("Switch.Set",r,function(e,t,s,r){if(0===t){for(a.s.cmd=o?1:0;a.h.length>=C_HIST;)a.h.splice(0,1);a.h.push([c(),o?1:0]),r&&r(!0)}else r&&r(!1)},s)}catch(e){f(e),l=!1}}function g(){var t=c();for(let e=0;e<a.p.length;e++)if(i(a.p[e][0],t))return a.p[e][1];throw new Error("no price")}f("shelly-porssisahko v."+a.s.v),f("URL: http://"+(Shelly.getComponentStatus("wifi").sta_ip??"192.168.33.1")+"/script/"+Shelly.getCurrentScriptId()),HTTPServer.registerEndpoint("",function(s,r){try{if(l)return s=null,r.code=503,void r.send();var n=function(e){var t={},s=e.split("&");for(let e=0;e<s.length;e++){var r=s[e].split("=");t[r[0]]=r[1]}return t}(s.query);s=null;let e="application/json",t=(r.code=200,!0);var o="text/html",i="text/javascript";"s"===n.r?(b(),r.body=JSON.stringify(a),t=!1):"r"===n.r?(A(a.s.configOK=!1),a.s.p.ts=0,r.code=204,t=!1):"f"===n.r&&n.ts?(a.s.fCmdTs=Number(n.ts),a.s.chkTs=0,r.code=204,t=!1):n.r?"s.js"===n.r?(r.body=atob("H4sIAAAAAAAACo1W4W7bNhB+FYXrAhJmCKft/thjjLbJ1nVJO9RegSEIFkaiI8Y06Ygnt4art8mb5MV2lBRHCZx0f2yL/O7uu7vvTrYakr8/H0tCOH6N4/d1kCAPMp+Wc+1AXJe6WI211Sn4ggLjh29/l5TJg3XFx5M3k6N/x5PP8pT8eXuzcs4E0HB7c3vjCI9Hwfj8SpUBn94bBypR1uqkUFfKbY5W1jw60SbJlV2a+cKoBN1Ze3uTRMSVmgVvrdog/yesjqqMU8kikquBe3cxv6hiXpYBSgct24RGBmjprxRHuxm6NzrzISgWfd7eYDQwVt3BawjadFF/qdnM790hfg6JCmAeXgCUSR2WnPGTT4edUj6uW+SKvz/ExFyb9VxBtHYG0DyAAi2X3mRJn797O5anZ3yu60ZhT/1Cu4m6kCqsXJpge9cNckdK2N0lJH5//05BElAXe9EXhmb8q3GZ/yqsTxWWxolchVzCcKmKRMnrQMlPpAdsqHZ3qRJprtOZzuROn3FCpGwA6V6ECOOcLt5PTo53d9VXZSBZ+EVpkfLhyqm5SQ8VKAo9InKYW0y0tau4Xir7zmMFDDoYp4VZwERdBklbbt5Zr7ImsVqVbap0G3cRyosAhXGX26/xTH/7NI15sd4+w/Dbx+CNtZQIwBKJqS+OVJpj6Q5AqCw7WiL6OI4B8qUkzZW71IRDhxkI7OelBmEyVjHG0WkM8UeGGHRHY3lDnWmINdxcsy0kGhy2ysj+0Pzamgmr3SXkQ9Prsfbo1Jw1TZjobzCKVaXbbthgqgHT6dyFImUCcu3otHRpLBbNsFtsHT8FoBF9fF+wdR2hwPwqxjvOFqrAXD76TItCz/1Sv8uNzTrhIn6LNtoGA1exx1Cs1odHX2rFxrXVI6NCol7Q58KqVNNaxigjbNDm6E5ahLFawVo2SsRONOrjO/tsqIWfjSiWXXVEK7WIyT4lRsSywWMTclQUvojeAfWWRPtBQnpawDeoUHRRM2ydeoebSgsdwXhQVbzl02aMQeNEtUlH3qbl3TRKsaGZUoOs2driMgfpSmuHhYaycMnL/mscbSOaicYxBalHjbkRV7hKKBvcPTadRCW1aL72s8FOn6fYrMHmENlvHqJgeJ0YVFUb8WFCqkdi0l0D1vjd3+L3/MVaVYPkxbqLrxKKxw84Vuy8CRtTre6LuZVC6xSdfBh/+iia8TfTVSw2O3/IZm+/y+MJk27oiuPA4h4+jMsXZxwtQTQN1HEq/LjZNgyFn41x7IG+5KRPWCVerGkNPUE95TSum2fh570a/RuG/UergrI28sTELY9zgSqJUtlncREh8r0vi/AsB+wNabyeGFeC/gGaqtHGYKyxyNnzBgMSjfSIiE0Ua0141vLVxrJT2G0p3t9iU3oENXZfjgjlmvFygZ3Sx94vOq+H+qUUFsbhagiwQpksTTAXxhpYSVL/tpoM74YNHi2JzbbB3T+EuCuaFy/UC2LwS/9VfJWKqCactuYuSoXFd/KDlwWO2tNrgN9bVlP822Lt6gfMc5NlGv/NBF3XwJdA7/Pn+/o1rpYh7sxRoa8/oKdML3EBYK3vUZQN/wPDZ+6sDwoAAA=="),e=i):"s.css"===n.r?(r.body=atob("H4sIAAAAAAAACo1VS2/jNhD+K8QGBZJsJEvJOnUktGhPCxRF0Ut7KXqgyKHEmiIFkvJjA//3Dqmns1m0F1ucF7/55sHN/T25J64Bpc5JZ6xz0tFmb0gQ37I78kuPIiKd8VQZkpDG+67YbP4ZJamQaBiEDqW19E1fpcy0s8HmG7F/lQy0g4J8/u0P8rMQYA35DBosVeT3vlKSTSbk8JRm5H6DTq+kMqfEyS9S1wV+Ww42QVFJLnji5wdC0YYZZWxBboCJTOSTLjhTtq+t6TVH7SN7gm1WEiU1JA3IuvEFydNP0JZEGO3DNQgvS19miaCtVOeC/AmWU01L0tJTcpTcNwX59GKD3XjKs+y7oLa11BiD0N6bknSU84h8253QpIu4b7z0ChDd6tIRxuCPCXpv2ugVHZjpztf2WboL9lTJWicOlCiIUHBKQPOSeDj5JKoKYkOaIUgq1AljcOk6Rc+DeZR7WjlUdMZJL01wAUW9PEB5TV9OK/bCZpeiqEAYCw/TkQoPNhZDe9BI7YcP5XId2ihYOc/WCqgNlfXNpA2ZKkMxggIxYPduDV0bPYdKFK1ArbWVMmz/psqP6ffbwNdcjwwZf84jh2NT2dESC+WMkhwTfqbZblsS1lsX2qszEjOz881jonj3VQ8sRGKiRvUesX5JpOZwQhOsjukWQCFDRLNClseuumJeCFHOPT51sekok/4cnSNDBWuA7YF/vKLlvwMN+RdfhYkRPr7JdL41H8xNt6a+thLbL/wmHlqUeUBf1bfaoYewcSrCR3R2nY59F1lN4IA3uKm4E6PpY6RjmdbhPGLGMQjnsWDeUu06ajHOXNUp2al5RzHinlTHRoYKTV1AuewRxTZUkmrZ0qGUAWvuYlNRS6QWUke3C/lpD2dhaQuODAmFLsC/iAYHBMfY4l70cPv0nHGo79DnMoxDyhjxvBDSOp+wRiqOw1TV06Qfx6Qro5DVA1gvGVXTYGMK3x5QnPWkNaFwKk4TbgYuLbBxwM0xIm+BS3q7Xmk7XFF3AXyE1yK6dybrqtsvK9t1Jq/TLhs7PGyyhfzYtfM2H5ZddhXMroPFZ2DxzXFGK4WpD4X/HxkPTfjW8EcuD+R1WdrlUprlRhc6Pq6MdVMp2oWnbPr6mpQF8zt418/CMEcskL5a2/gOTqtGyPWKweixYyMuCONytLSLhsd8l60sd+Nzk7Y+z+Y0RwYnHbKRj3xNM93a7ZqUGWOrFvlY1UlVPdy4hLX8/c694Lx0vf/Lnzv4oeqx2vrvt69fHqb68i/noVfJnAgAAA=="),e="text/css"):"status"===n.r?(r.body=atob("H4sIAAAAAAAACqVSS07DMBC9iuUVLJo2CyQWqSV2CCEVCS4wsVPi1LFDZtqS++QMXCAXw/k0VZrSDYvxYt6bN++NHBHEJmHSAOKa50xKLiIqfamheQwfV2KTZrBHZitqAa3WuJC5Eq+ggABsEATDUM/cYWIZJkZTMvKRTsLivanTXfNjWaotwUTVuuMljVFT26b2z8hSUInJQqSqKgo9EnKnkpHxoQ2MiLZbJ6JlF1tESh9O2bfmm/nyo/FCOsMnIMkWC1lePsyAnMKVb8biran1wdtsY1kglgFznbloGfuVfsrb6fdOLsyJxZ9cPOkdzJrP7YVm3c0g28nETlV9tuIcrN92LYG5kaDXTTWSKzX8w/YfBlvlS49npx3liq+egbLUBYky+XrBO+4l/I8C2mOQIb+PlgP8CzzDzy3QAgAA"),e=o):"status.js"===n.r?(r.body=atob("H4sIAAAAAAAACoVW647iNhR+leCdorgJGaCrSp1gULu71VQzq1l1kFoJoeJJDMkSbNY2TBHk3zwKb8KL9ZyEW6ZMKy7x5Vy/c/w560xYp8+a/hx+EWuGS64dwbhZycilrLu2erVOx+5SpbHTrDFmLLeC4lKtHNpEq2dHimfnk9ZKu0QqJ+aWE1rY0qWGL5gOjJ/Cf+Rb1uzoYB5kQk5s4ivmfjMueWca0SwmNEilFPq2//meiQBWeuTL7mX3cn+/eyE35MvDb4/Er8gbu8pAUmVKHzQmWggJ0lrER+GZikXF+ueHj5/+euz/PkgD3BseBKV6rsjZnoBgYTWw6tf0bxG7beoRJ7qe/pGAj6MDYytq7k+MQTzG9h77P/dLTzgdBlrMMx4Jl3xniD9WesbtR8Con86Ei0DixG2JH74XwfjDLO4b6tdalN68skM9NwV/yx5x3Oluu9tKK1IpJMWg6CGqmK9eZTO6E2aacr1UN87VGnPjy8lZbnmZWudJd295tkzlQSyrQHAmdsezTJzkknSS/FtwdAZVKseqEtXoIfnKF8axXE9TY4W1CzBWYnMJlyiZAixguuGMPLfZQbfW9EgCJrl1El5YIN7bFlAeMEUNaNBUWPWVF3qcyyAITgAuq4He7bYrKcsYV8cY36rfYl6GiQUq1MxuC0quexSkwUSUAdLGJeXTNr2G5esfm/htv6dHhEmLgIf5bpsusQsoYLIU2qQKoBHB0h8MaQjntQ3tWHZ6vW4phO3i2Tdw5k2n/T40Hu62g7nQdI0nV7LBMDyICWZC0THeQSQUnkdlMF+YxBU0RBE41WfiLRCX+xNeCBc2OZMDUVq1TDRaYbPDbL0OZDDgw0FriLQwkAM7xEloGw0KE681ZLgW7sc8P7lpgpsipkjawo0qY0I3NIeswXq/hucQ673ZzGFchf5WLbQBcNf7cs8r5SYk3KPkS1ZrHRPEZO0ZiYX2kGLMMAc79GesUs540ByWQEHUZ6WAZxNJa7Npna3GCAbOWkGWzjab8+IpiC/KFrEwrqXVraNau1QDghgn9VanYylj+AgLxqjXXcFqgvq2y041hdWzJsB8ZcnhCRt1rHYKnmXkaj07w429gWePjJW0jWcBXGBvnlQWh0hL+dVa9sgTj6YTrRYyvnknYvyUm6Q78hPm4tdDn7ETZdwYRsapJd0KH8yQEvPOtY27I+qhLOxj+hcYqiokeuTPwlu57hF46i4JL9XfY0ne3zcPXJEXM8Uu00ECZU8Co7R1XeED3F0LBW8IrLqP112y75R6PYIehDns4Oah75L01f0BrYfdhgUwjho7oFJ2WMZIByP2M+Zm/4dTpQdNEc0F4AwA1yN7Dp4jiwChA0iHFZWat/B6HbfHsjw65ZfnecRthCyxjpQ0Cq5qUbwoAG0AB7Au2BGv8n7jdYD004w7InWArmNlDP+PF4Hy6rdnN/9+Mj+OyktoP8Ek8jwEmvU//PJ4ILb8H22cA7QgCQAA"),e=i):"config"===n.r?(r.body=atob("H4sIAAAAAAAACp2T3W6bMBTHX8VCmtpe0CQ0aqOJWOKiVUgamAbttEtj3OJgbAYmXXa9R8kz9AV4sRkSSGBTok4CIY7P7/yPz4cZ0jXADOX5VJMYBBr8/nhve/e+OVAn0JQoYKRxSADGmrJl6g33xrfRZAjdaIWKXG42aUrVETRzwgiWgIbTRIQEmoOdoWFrQEq0RoCV20iW7zVFeVrUkFCfnP4iU6MlFuW23HJJKCcciFrviJGblExxRHAciJ9VBMrXLeopibh858B6fO7qrFGrAz617pRmUiQozgtZ/Q/vdMP4DA5UiDYthQfxt8g8FDGRoyE0DH14d0xw+hrJHrOv707zGWVJoSpYcE4r0QoK4vZ4Vm6leihD529Osgy6zsB9eGjoLyiOhV6TcU6a8C+RakvdXmh2h6C6QzUJi/K3Z7uzufXk/cc0nMoxGeo4CSHY53k6jZnt+NZXa259KIkZ5RJlaIW6HU9GOqNJvxUn9efWwnMdMFPTYy+Xlg/8J8exP7Yg1grxlZoo0d8OQ0+J8happIKDNWKFymsMjXHXNDLgyOiaJnDSNdzC265hDHtRbuBNTwka7WqCqJkXv+CSJtW+ZeW2Vz5Dx/wwyS1iUY5AWiFMLTTQe4Xf+e8DqPqfL7x2JJqjNdnNUFBI2SbvI8YI5wjuO/Hv7vmuvbQdx/X/8pK40TisbkemWhKRYbLXO1qjHJpBdoYWHDOK4+nFG+WheLsWKeGX2kC7utiF8yLC2KZJPscZTSXMyI95fqmpsuhY8Bf6er3KtSvVo93xH4h40fCuBQAA"),e=o):"config.js"===n.r?(r.body=atob("H4sIAAAAAAAACoVV227bOBD9FZstVLJWFNld9MEyY7SbAott0gB1tuhbTUsjm7BuS1FuDa/+Jn+SH9uhKLlyYrQvsmfO4WWG55CHBPRA8eE42Ak1AC7KfRZSxq8OWu0PMqa7XEYDf8h5qYUGxxkqx2n+soMZIWzeC4N/S0pepHkEhHkyy0D9dX97w2/vrj98W9x/9lJRUAquxqmXs7zQMs8GO5FUwMnLg67J1csD1LNLi1wtmdufzxKFZ0IL5JXu5TGyaZntMB1uINxChADGc9KGZEqIZe1EfzBGNh2JfS+NkU1ncr3p85s4MH3TnJAgzhU1AXA/gNnkjwBGI6ZHfDmTWVEhaV9gjc0eVvkPMpARJ19NsaZkSsgImFeIaKGF0nTiEp+werC07VxtT5qpPQVFIkJ4lySUfCUuWZG2UfHmN8yYsPNbtQs12+j6RoW32jrj2QwY5+anXeMpKd70SXbLoNTJCWB85gRS/yJMoxNi6nuYOscdXyQy7atg7GGiBScXBag+OPEwcQTDTJ+CmDiCT6adNNOiGfy6DoUONxRFHuZZmSdg6sDuAavrAChz/3y/8IqqNBQ7XSl2Rqkiij7sINM3stSAp0FJmMhwS9zGWNj5qwN4hQLDuYZYVImmLDBeM27SnZtcwZH6qUpXYBYNdCN9LugzVzBXG/l3UM8XBkH98+fGmI+nPoIo/G5YzxFmGGq/Q3qmMEgj/g47cYZBV1tU1k+VaVTIr6XmOLQZZT7/NVo6I7WGhDOZjyVhP/A8+HPBtZVZLfGzUusojYiOHT3RmCnF6uiIn8isxVFK/FbojZfKjHYj3J8jetpj7ZD+kif6Y839G3LxXUg9WIO+FlrQfz7fjF5dqiK8/Phl4S1Az7ew56TIVVnKC5RmLNfEsQJ+Nfp7cffJK7WS2VrGe6oZCya+z3nohSiYeW/SxYjMFTf16A1k1KhSJID3D7kXSQJ4jWhdDfFuMS9Dja2zbjjSll+k2sB0YK4xtmQ1mz7Nh57+oRvs6KR2hZaCB+ylUJZibTzVHXuuwt+7qHme7HNVqDwtzLarTMv08eHxQT0+TPGqy6okwUcLHyzctj/Dz9FMbN4cWpzkKNRrY7cs/07Z5RjejN76r+H1W5+hROD5Wdi2xY4uudGnaytqegy2x+Tu4xBvrl6N2AaGDar/Bx75L/lpBwAA"),e=i):r.code=404:(r.body=atob("H4sIAAAAAAAACo1SzY7TMBB+FeMDakWTihvajb1CsAf2xAFxRa49bWbr2sYzaVUh3oZn2Bfoi+E02Z8srODieOYbf983k2leuWj5mKDlnddNfwpvwkZB0M0O2AjbmkzAquN19U43jOxBfz7dZSKk0692e7prlkN2eBDMDtQe4ZBiZmFjYAis5AEdt8rBHi1U52CBARmNr8gaD+qt1I3DvbDeECmOaQjRqb9rFvChghKG8SGl4nwC2piO+nV/XoqbrlCITxTZ+ChmjRFthrVqmRNdLJe3OCD1GgWbvCl9f1uVeWz1E6RZGj0fJR6FRttmRc9i3WBIHYt+yiobh3EYkTm3ZlYVseGOyqDBbqHYHb73BKRF480KvFjHPKm/F6jOsP6C3jTL4T51UI0/4TyM6pFCv9zEP00XyjVuXjY5xR9Mvi+r1G3L8b9OB56p0+EkmzGxLgXE4uP1V3XA4OKh9tEaxhjqmHGDocZgfeeAZrJHfBuJ5fzSAwunyvJ3u6K3sBkMw7WHPlKgtKsnqRnMFyYlCO5Di94NFavojvWTbF+U4fsN9fCPvcmC1JRFDqaLPtWUrSq2r+BCXmUl30CdIXljYSb7xuVCyonmjOY/F5b+oPQYtoWwIIXAK0l89EAtAMu+vD4veC8kqS6xPMsN1wl9SYz2i836lmTZ8XHGvwHYLtlMJgQAAA=="),e=o),r.headers=[["Content-Type",e]],t&&r.headers.push(["Content-Encoding","gzip"])}catch(e){f(e),r.code=500}r.send()}),Timer.set(1e4,!0,h),h();