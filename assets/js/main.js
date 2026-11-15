// rudy.chat: theme preview, the talking-bot demo, and screenshot slots.
(function () {
  'use strict';

  // Theme values copied from the app (TMessagesProj/.../ActionBar/RudyTheme.java and the rudy_*.attheme files).
  var ACCENTS = [
    { fa: 'مشکی', faDark: 'سفید', light: '#111113', dark: '#EDEDF0', bubble: '#3A3A3F' },
    { fa: 'صورتی', light: '#BF4277', dark: '#EC7FA9', bubble: '#8E3560' },
    { fa: 'بنفش', light: '#7450C4', dark: '#AC93EC', bubble: '#56419A' },
    { fa: 'قرمز', light: '#C8453F', dark: '#EE8079', bubble: '#953834' },
    { fa: 'اقیانوسی', light: '#2D6FB8', dark: '#73A9EA', bubble: '#285A93' },
    { fa: 'نعنایی', light: '#187A5E', dark: '#55C7A3', bubble: '#1A6A53' },
    { fa: 'کهربایی', light: '#9C6A17', dark: '#E2B35F', bubble: '#7E5B17' },
    { fa: 'گرافیتی', light: '#55555C', dark: '#AEAEB5', bubble: '#46464C' },
    { fa: 'زرشکی', light: '#800000', dark: '#D27373', bubble: '#6E1A1A' }
  ];

  // Exact colors the APK computes for each theme and accent (Telegram accent math applied to rudy_day /
  // rudy_night / rudy_black.attheme with the RudyTheme.java accents). Generated; regenerate when the app's themes change.
  var APK = {"light":[{"bar":"#ffffff","bar-fg":"#333333","bar-icon":"#262628","bar-sub":"#79817e","logo":"#111113","wall-a":"#e9e9e5","in":"#ffffff","in-fg":"#000000","in-time":"#8b8b8c","in-link":"#0e0e11","out":"#111113","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#ffffff","hint":"#858a84","icon":"#7e7e7f","send":"#111114","list":"#ffffff","name":"#111112","msg":"#6e6e6f","time":"#7f7f7f","sep":"#e6e6e6","acc":"#121215","on-acc":"#ffffff","mute":"#b2b3b4","fab":"#111113","on-fab":"#ffffff","check":"#111114","pin":"#8d8d8d","msg-name":"#0f0f11","kb":"#e9e9ea","key":"rgba(173,173,175,0.40)","key-fg":"rgba(68,68,68,0.94)","date-bg":"rgba(255,255,255,0.96)","online":"#111113","wall-b":"#d9d9d4"},{"bar":"#ffffff","bar-fg":"#333333","bar-icon":"#4e3a46","bar-sub":"#79817e","logo":"#bf4277","wall-a":"#e9e9e5","in":"#ffffff","in-fg":"#000000","in-time":"#979192","in-link":"#ad1061","out":"#bf4277","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#ffffff","hint":"#858a84","icon":"#968a90","send":"#cd1e7c","list":"#ffffff","name":"#1e181a","msg":"#787376","time":"#868284","sep":"#e6e6e6","acc":"#d3208d","on-acc":"#ffffff","mute":"#c4bbbf","fab":"#c64685","on-fab":"#ffffff","check":"#cc177d","pin":"#939090","msg-name":"#b12470","kb":"#f3eef0","key":"rgba(196,184,190,0.40)","key-fg":"rgba(68,68,68,0.94)","date-bg":"rgba(255,255,255,0.96)","online":"#c52488","wall-b":"#d9d9d4"},{"bar":"#ffffff","bar-fg":"#333333","bar-icon":"#403d4f","bar-sub":"#79817e","logo":"#7350c4","wall-a":"#e9e9e5","in":"#ffffff","in-fg":"#000000","in-time":"#949297","in-link":"#3f20b1","out":"#7450c4","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#ffffff","hint":"#858a84","icon":"#8e8c97","send":"#5030d2","list":"#ffffff","name":"#1b191f","msg":"#747478","time":"#848386","sep":"#e6e6e6","acc":"#4732d9","on-acc":"#ffffff","mute":"#bebcc4","fab":"#7154cb","on-fab":"#ffffff","check":"#4629d2","pin":"#919093","msg-name":"#4c32b5","kb":"#f0eff3","key":"rgba(188,186,196,0.40)","key-fg":"rgba(68,68,68,0.94)","date-bg":"rgba(255,255,255,0.96)","online":"#4535cb","wall-b":"#d9d9d4"},{"bar":"#ffffff","bar-fg":"#333333","bar-icon":"#503b3d","bar-sub":"#79817e","logo":"#c8453f","wall-a":"#e9e9e5","in":"#ffffff","in-fg":"#000000","in-time":"#979291","in-link":"#b50912","out":"#c8453f","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#ffffff","hint":"#858a84","icon":"#978a8b","send":"#d71724","list":"#ffffff","name":"#1f1918","msg":"#787374","time":"#878282","sep":"#e6e6e6","acc":"#dd1834","on-acc":"#ffffff","mute":"#c4bbbc","fab":"#d04346","on-fab":"#ffffff","check":"#d60f23","pin":"#939090","msg-name":"#b91e29","kb":"#f3efee","key":"rgba(197,184,185,0.40)","key-fg":"rgba(68,68,68,0.94)","date-bg":"rgba(255,255,255,0.96)","online":"#cf1e39","wall-b":"#d9d9d4"},{"bar":"#ffffff","bar-fg":"#333333","bar-icon":"#36454d","bar-sub":"#79817e","logo":"#2d6eb8","wall-a":"#e9e9e5","in":"#ffffff","in-fg":"#000000","in-time":"#8f9296","in-link":"#005fa6","out":"#2d6fb8","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#ffffff","hint":"#858a84","icon":"#878f95","send":"#0375c6","list":"#ffffff","name":"#161a1e","msg":"#727578","time":"#818486","sep":"#e6e6e6","acc":"#0487cb","on-acc":"#ffffff","mute":"#b9bec3","fab":"#307ebf","on-fab":"#ffffff","check":"#0079c5","pin":"#8f9092","msg-name":"#0d6aaa","kb":"#edeff3","key":"rgba(181,189,195,0.40)","key-fg":"rgba(68,68,68,0.94)","date-bg":"rgba(255,255,255,0.96)","online":"#0a84be","wall-b":"#d9d9d4"},{"bar":"#ffffff","bar-fg":"#333333","bar-icon":"#2b3f36","bar-sub":"#79817e","logo":"#177a5e","wall-a":"#e9e9e5","in":"#ffffff","in-fg":"#000000","in-time":"#8b9291","in-link":"#006e44","out":"#187a5e","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#ffffff","hint":"#858a84","icon":"#7f8d88","send":"#00834e","list":"#ffffff","name":"#131918","msg":"#6f7472","time":"#7f8382","sep":"#e6e6e6","acc":"#008747","on-acc":"#ffffff","mute":"#b3bdb9","fab":"#1a7e5b","on-fab":"#ffffff","check":"#00824a","pin":"#8d9090","msg-name":"#027144","kb":"#e9efee","key":"rgba(173,187,182,0.40)","key-fg":"rgba(68,68,68,0.94)","date-bg":"rgba(255,255,255,0.96)","online":"#007e41","wall-b":"#d9d9d4"},{"bar":"#ffffff","bar-fg":"#333333","bar-icon":"#463a2f","bar-sub":"#79817e","logo":"#9c6917","wall-a":"#e9e9e5","in":"#ffffff","in-fg":"#000000","in-time":"#94938d","in-link":"#8d4a00","out":"#9c6a17","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#ffffff","hint":"#858a84","icon":"#928b82","send":"#a75500","list":"#ffffff","name":"#1c1914","msg":"#767370","time":"#858380","sep":"#e6e6e6","acc":"#ac4b00","on-acc":"#ffffff","mute":"#c0bbb5","fab":"#a26519","on-fab":"#ffffff","check":"#a75000","pin":"#91918e","msg-name":"#904900","kb":"#f1efeb","key":"rgba(191,184,176,0.40)","key-fg":"rgba(68,68,68,0.94)","date-bg":"rgba(255,255,255,0.96)","online":"#a14400","wall-b":"#d9d9d4"},{"bar":"#ffffff","bar-fg":"#333333","bar-icon":"#363738","bar-sub":"#79817e","logo":"#55555c","wall-a":"#e9e9e5","in":"#ffffff","in-fg":"#000000","in-time":"#909090","in-link":"#4a4b53","out":"#55555c","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#ffffff","hint":"#858a84","icon":"#888889","send":"#595a63","list":"#ffffff","name":"#171717","msg":"#727273","time":"#828282","sep":"#e6e6e6","acc":"#5b5d65","on-acc":"#ffffff","mute":"#b9baba","fab":"#58595f","on-fab":"#ffffff","check":"#585962","pin":"#8f8f8f","msg-name":"#4d4e55","kb":"#ededee","key":"rgba(182,182,183,0.40)","key-fg":"rgba(68,68,68,0.94)","date-bg":"rgba(255,255,255,0.96)","online":"#56585f","wall-b":"#d9d9d4"},{"bar":"#ffffff","bar-fg":"#333333","bar-icon":"#40272b","bar-sub":"#79817e","logo":"#800000","wall-a":"#e9e9e5","in":"#ffffff","in-fg":"#000000","in-time":"#938b8a","in-link":"#73000b","out":"#800000","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#ffffff","hint":"#858a84","icon":"#8e7c7d","send":"#89000f","list":"#ffffff","name":"#1a1211","msg":"#756d6e","time":"#847e7e","sep":"#e6e6e6","acc":"#8d001a","on-acc":"#ffffff","mute":"#beb1b2","fab":"#85010a","on-fab":"#ffffff","check":"#890013","pin":"#918d8c","msg-name":"#76000d","kb":"#f0e9e8","key":"rgba(188,171,173,0.40)","key-fg":"rgba(68,68,68,0.94)","date-bg":"rgba(255,255,255,0.96)","online":"#84001a","wall-b":"#d9d9d4"}],"dark":[{"bar":"#1d1d1d","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#ededf0","wall-a":"#1e1e1e","in":"#292929","in-fg":"#fafafa","in-time":"#808080","in-link":"#f2f3f4","out":"#3a3a3f","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#1e1e1e","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#e5e6e9","list":"#131313","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#000000","acc":"#e9e9ec","on-acc":"#111113","mute":"#454545","fab":"#d2d3d4","on-fab":"#111113","check":"#e9e9ec","pin":"#646464","msg-name":"#ebebeb","kb":"#1e1e1e","key":"#2d2d2d","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#eeeff1","wall-b":"#151515"},{"bar":"#1d1b1b","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#ec7fa9","wall-a":"#1e1c1c","in":"#292929","in-fg":"#fafafa","in-time":"#807e7f","in-link":"#f0a3ce","out":"#8e3560","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#1e1e1e","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#e56bb0","list":"#131212","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#000000","acc":"#e87ab4","on-acc":"#111113","mute":"#454545","fab":"#d187ad","on-fab":"#111113","check":"#e882bd","pin":"#646464","msg-name":"#ebebeb","kb":"#1e1e1e","key":"#2d2c2c","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#ed7bba","wall-b":"#151414"},{"bar":"#1d1c1d","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#ab93ec","wall-a":"#1e1d1e","in":"#292929","in-fg":"#fafafa","in-time":"#7e7e80","in-link":"#b8b1f0","out":"#56419a","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#1e1e1e","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#8b82e5","list":"#131213","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#000000","acc":"#9b8ee8","on-acc":"#111113","mute":"#454545","fab":"#9e95d1","on-fab":"#111113","check":"#9c94e8","pin":"#646464","msg-name":"#ebebeb","kb":"#1e1e1e","key":"#2d2c2d","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#9b90ed","wall-b":"#151415"},{"bar":"#1d1c1b","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#ee8079","wall-a":"#1e1d1c","in":"#292929","in-fg":"#fafafa","in-time":"#807e7e","in-link":"#f5a1ab","out":"#953834","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#1e1e1e","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#eb6576","list":"#131312","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#000000","acc":"#ea747e","on-acc":"#111113","mute":"#454545","fab":"#d48389","on-fab":"#111113","check":"#ee7e8d","pin":"#646464","msg-name":"#ebebeb","kb":"#1e1e1e","key":"#2d2d2c","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#f17682","wall-b":"#151514"},{"bar":"#1b1b1d","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#73a9ea","wall-a":"#1c1c1e","in":"#292929","in-fg":"#fafafa","in-time":"#7d7f80","in-link":"#9acfee","out":"#285a93","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#1e1e1e","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#5eb3e3","list":"#121213","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#000000","acc":"#6eb5e6","on-acc":"#111113","mute":"#454545","fab":"#7fadcf","on-fab":"#111113","check":"#76bfe6","pin":"#646464","msg-name":"#ebebeb","kb":"#1e1e1e","key":"#2c2c2d","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#6fbbeb","wall-b":"#141415"},{"bar":"#1a1c1c","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#55c7a3","wall-a":"#1b1d1d","in":"#282929","in-fg":"#fafafa","in-time":"#7c7f7e","in-link":"#7acba3","out":"#1a6a53","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#1d1e1e","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#42c182","list":"#111313","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#000000","acc":"#51c38f","on-acc":"#111113","mute":"#454545","fab":"#63b08e","on-fab":"#111113","check":"#59c38d","pin":"#646464","msg-name":"#ebebeb","kb":"#1d1e1e","key":"#2b2d2d","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#51c88f","wall-b":"#131515"},{"bar":"#1d1d1b","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#e2b35e","wall-a":"#1e1e1c","in":"#292929","in-fg":"#fafafa","in-time":"#807e7d","in-link":"#e6b589","out":"#7e5b17","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#1e1e1e","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#db8c49","list":"#131312","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#000000","acc":"#de9c5a","on-acc":"#111113","mute":"#454545","fab":"#c89d6f","on-fab":"#111113","check":"#de9a63","pin":"#646464","msg-name":"#ebebeb","kb":"#1e1e1e","key":"#2d2d2c","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#e39c5a","wall-b":"#151514"},{"bar":"#1c1c1c","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#aeaeb5","wall-a":"#1d1d1d","in":"#292929","in-fg":"#fafafa","in-time":"#7e7e7e","in-link":"#b4b5b9","out":"#46464c","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#1e1e1e","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#a8a9af","list":"#121212","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#000000","acc":"#abacb2","on-acc":"#111113","mute":"#454545","fab":"#9b9ca0","on-fab":"#111113","check":"#abacb2","pin":"#646464","msg-name":"#ebebeb","kb":"#1e1e1e","key":"#2c2c2c","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#afb0b6","wall-b":"#141414"},{"bar":"#1d1c1b","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#d27373","wall-a":"#1e1d1c","in":"#292929","in-fg":"#fafafa","in-time":"#7f7d7d","in-link":"#e29aa6","out":"#6e1a1a","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#1e1e1e","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#d46679","list":"#131212","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#000000","acc":"#d4727f","on-acc":"#ffffff","mute":"#454545","fab":"#c17f87","on-fab":"#ffffff","check":"#d97b8e","pin":"#646464","msg-name":"#ebebeb","kb":"#1e1e1e","key":"#2d2c2c","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#db7484","wall-b":"#151414"}],"black":[{"bar":"#000000","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#ededf0","wall-a":"#000000","in":"#1d1d1d","in-fg":"#fafafa","in-time":"#808080","in-link":"#f2f3f4","out":"#3a3a3f","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#0b0b0b","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#e5e6e9","list":"#000000","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#1d1d1d","acc":"#e9e9ec","on-acc":"#111113","mute":"#454545","fab":"#d2d3d4","on-fab":"#111113","check":"#e9e9ec","pin":"#646464","msg-name":"#ebebeb","kb":"#0d0d0d","key":"#131313","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#eeeff1","wall-b":"#000000"},{"bar":"#000000","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#ec7fa9","wall-a":"#000000","in":"#1d1c1c","in-fg":"#fafafa","in-time":"#807e7f","in-link":"#f0a3ce","out":"#8e3560","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#0b0b0b","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#e56bb0","list":"#000000","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#1d1c1c","acc":"#e87ab4","on-acc":"#111113","mute":"#454545","fab":"#d187ad","on-fab":"#111113","check":"#e882bd","pin":"#646464","msg-name":"#ebebeb","kb":"#0d0d0d","key":"#131313","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#ed7bba","wall-b":"#000000"},{"bar":"#000000","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#ab93ec","wall-a":"#000000","in":"#1d1c1d","in-fg":"#fafafa","in-time":"#7e7e80","in-link":"#b8b1f0","out":"#56419a","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#0b0b0b","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#8b82e5","list":"#000000","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#1d1c1d","acc":"#9b8ee8","on-acc":"#111113","mute":"#454545","fab":"#9e95d1","on-fab":"#111113","check":"#9c94e8","pin":"#646464","msg-name":"#ebebeb","kb":"#0d0d0d","key":"#131313","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#9b90ed","wall-b":"#000000"},{"bar":"#000000","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#ee8079","wall-a":"#000000","in":"#1d1d1c","in-fg":"#fafafa","in-time":"#807e7e","in-link":"#f5a1ab","out":"#953834","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#0b0b0b","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#eb6576","list":"#000000","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#1d1d1c","acc":"#ea747e","on-acc":"#111113","mute":"#454545","fab":"#d48389","on-fab":"#111113","check":"#ee7e8d","pin":"#646464","msg-name":"#ebebeb","kb":"#0d0d0d","key":"#131313","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#f17682","wall-b":"#000000"},{"bar":"#000000","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#73a9ea","wall-a":"#000000","in":"#1c1c1d","in-fg":"#fafafa","in-time":"#7d7f80","in-link":"#9acfee","out":"#285a93","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#0b0b0b","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#5eb3e3","list":"#000000","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#1c1c1d","acc":"#6eb5e6","on-acc":"#111113","mute":"#454545","fab":"#7fadcf","on-fab":"#111113","check":"#76bfe6","pin":"#646464","msg-name":"#ebebeb","kb":"#0d0d0d","key":"#131313","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#6fbbeb","wall-b":"#000000"},{"bar":"#000000","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#55c7a3","wall-a":"#000000","in":"#1b1d1d","in-fg":"#fafafa","in-time":"#7c7f7e","in-link":"#7acba3","out":"#1a6a53","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#0a0b0b","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#42c182","list":"#000000","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#1b1d1d","acc":"#51c38f","on-acc":"#111113","mute":"#454545","fab":"#63b08e","on-fab":"#111113","check":"#59c38d","pin":"#646464","msg-name":"#ebebeb","kb":"#0d0d0d","key":"#121313","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#51c88f","wall-b":"#000000"},{"bar":"#000000","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#e2b35e","wall-a":"#000000","in":"#1d1d1c","in-fg":"#fafafa","in-time":"#807e7d","in-link":"#e6b589","out":"#7e5b17","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#0b0b0b","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#db8c49","list":"#000000","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#1d1d1c","acc":"#de9c5a","on-acc":"#111113","mute":"#454545","fab":"#c89d6f","on-fab":"#111113","check":"#de9a63","pin":"#646464","msg-name":"#ebebeb","kb":"#0d0d0d","key":"#131313","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#e39c5a","wall-b":"#000000"},{"bar":"#000000","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#aeaeb5","wall-a":"#000000","in":"#1c1c1c","in-fg":"#fafafa","in-time":"#7e7e7e","in-link":"#b4b5b9","out":"#46464c","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#0b0b0b","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#a8a9af","list":"#000000","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#1c1c1c","acc":"#abacb2","on-acc":"#111113","mute":"#454545","fab":"#9b9ca0","on-fab":"#111113","check":"#abacb2","pin":"#646464","msg-name":"#ebebeb","kb":"#0d0d0d","key":"#131313","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#afb0b6","wall-b":"#000000"},{"bar":"#000000","bar-fg":"#ffffff","bar-icon":"#ffffff","bar-sub":"rgba(242,242,242,0.45)","logo":"#d27373","wall-a":"#000000","in":"#1d1c1c","in-fg":"#fafafa","in-time":"#7f7d7d","in-link":"#e29aa6","out":"#6e1a1a","on-out":"#ffffff","out-time":"#ffffff","out-check":"#ffffff","panel":"#0b0b0b","hint":"rgba(255,255,255,0.39)","icon":"rgba(255,255,255,0.39)","send":"#d46679","list":"#000000","name":"#f1f1f1","msg":"#828282","time":"#787878","sep":"#1d1c1c","acc":"#d4727f","on-acc":"#ffffff","mute":"#454545","fab":"#c17f87","on-fab":"#ffffff","check":"#d97b8e","pin":"#646464","msg-name":"#ebebeb","kb":"#0d0d0d","key":"#131313","key-fg":"#ffffff","date-bg":"rgba(55,55,55,0.59)","online":"#db7484","wall-b":"#000000"}]};
  var MODES = { light: 1, dark: 1, black: 1 };

  // WCAG contrast, used like the app does: text on an accent fill is black or white, whichever reads better.
  function lum(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255].map(function (v) {
      v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }).reduce(function (a, v, i) { return a + v * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function onColor(bg) { return contrast('#ffffff', bg) >= contrast('#111113', bg) ? '#ffffff' : '#111113'; }

  function themeVars(mode, i) {
    var c = APK[mode][i], vars = {};
    Object.keys(c).forEach(function (k) { vars[k] = c[k]; });
    vars.pat = mode === 'light' ? 'rgba(0,0,0,.07)' : mode === 'dark' ? 'rgba(255,255,255,.035)' : 'rgba(255,255,255,0)';
    vars.pill = mode === 'light' ? 'rgba(70,70,72,.42)' : 'rgba(60,60,61,.8)';
    vars.shadow = mode === 'light' ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,.35)';
    vars['key-shadow'] = mode === 'light' ? 'rgba(0,0,0,.12)' : 'rgba(0,0,0,.5)';
    vars.mark = onColor(c.logo) === '#ffffff' ? 'invert(1)' : 'none';
    return vars;
  }
  function paint(el, mode, i) {
    var vars = themeVars(mode, i);
    Object.keys(vars).forEach(function (k) { el.style.setProperty('--' + k, vars[k]); });
    el.dataset.mode = mode;
  }

  // ---- theme picker -------------------------------------------------------------------------------------
  var state = { mode: 'light', accent: 0 };
  try {
    var saved = JSON.parse(localStorage.getItem('rudy-theme') || 'null');
    if (saved && MODES[saved.mode] && ACCENTS[saved.accent]) state = saved;
  } catch (e) { /* storage unavailable: defaults are fine */ }

  var swatches = document.getElementById('swatches');
  var swatchName = document.getElementById('swatch-name');
  var segButtons = document.querySelectorAll('.seg button');
  var live = [document.getElementById('demo'), document.getElementById('prev-list'), document.getElementById('prev-chat')].filter(Boolean);

  ACCENTS.forEach(function (a, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'radio');
    b.dataset.i = i;
    swatches.appendChild(b);
  });

  function render() {
    live.forEach(function (el) { paint(el, state.mode, state.accent); });
    // the site's own Rudy logo follows the picked color (light value on light pages, dark value on dark pages)
    document.documentElement.style.setProperty('--brand-light', APK.light[state.accent].logo);
    document.documentElement.style.setProperty('--brand-dark', APK.dark[state.accent].logo);
    segButtons.forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.mode === state.mode)); });
    swatches.querySelectorAll('button').forEach(function (b, i) {
      var a = ACCENTS[i];
      b.style.setProperty('--c', state.mode === 'light' ? a.light : a.dark);
      var label = state.mode !== 'light' && a.faDark ? a.faDark : a.fa;
      b.setAttribute('aria-label', label);
      b.title = label;
      b.setAttribute('aria-checked', String(i === state.accent));
    });
    var cur = ACCENTS[state.accent];
    swatchName.textContent = (state.mode !== 'light' && cur.faDark ? cur.faDark : cur.fa);
    try { localStorage.setItem('rudy-theme', JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  segButtons.forEach(function (b) {
    b.addEventListener('click', function () { state.mode = b.dataset.mode; render(); });
  });
  swatches.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    state.accent = Number(b.dataset.i);
    render();
  });
  render();

  // ---- screenshot slots: a real screenshot if present, otherwise a mockup in that theme ------------------
  var listTemplate = document.getElementById('prev-list');
  document.querySelectorAll('#shots figure').forEach(function (fig) {
    var device = document.createElement('div');
    device.className = 'device';
    fig.insertBefore(device, fig.firstChild);
    var img = new Image();
    img.className = 'shot-img';
    img.alt = fig.querySelector('figcaption').textContent;
    img.onload = function () { device.appendChild(img); };
    img.onerror = function () {
      var mock = listTemplate.cloneNode(true);
      mock.removeAttribute('id');
      mock.setAttribute('aria-hidden', 'true');
      paint(mock, fig.dataset.mode, Number(fig.dataset.accent));
      device.appendChild(mock);
    };
    img.src = fig.dataset.src;
  });

  // ---- the talking-bot demo -----------------------------------------------------------------------------
  var feed = document.getElementById('feed');
  var status = document.getElementById('status');
  var kb = document.getElementById('kb');
  var fa = function (n) { return String(n).replace(/\d/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[d]; }); };
  var minute = 41;
  var now = function () { return fa('21:' + (minute < 10 ? '0' : '') + minute); };
  var CHECK = '<svg class="chk"><use href="assets/img/icons.svg#i-check"/></svg>';
  var answers = {
    what: ['یه پیام‌رسانم. چت، گروه، کانال، عکس، ویس، هرچی بخوای.', 'فقط حرف اضافه نمی‌زنم.'],
    safe: ['پیامات روی سرورهای خود رودی می‌مونه.', 'منم فضول نیستم. خیالت راحت.'],
    diff: ['مرتبم، سریعم، شلوغ‌بازی هم ندارم.', 'کت‌وشلوارمم که دیگه معلومه.'],
    color: ['هشت تا. یه پایین‌تر رو ببین.', 'ولی مشکی به من بیشتر میاد.'],
    smile: ['sticker', 'همین بود.']
  };
  var busy = false;

  function lastOf(side) {
    var els = feed.querySelectorAll('.msg, .sticker');
    var last = els[els.length - 1];
    return last && last.classList.contains('msg') && last.classList.contains(side) ? last : null;
  }
  function add(side, text) {
    var prev = lastOf(side);
    if (prev) prev.classList.remove('tail');
    var el;
    if (text === 'sticker') {
      el = document.createElement('div');
      el.className = 'sticker pop';
      el.innerHTML = '<span class="mascot" role="img" aria-label="استیکر رودی"></span>';
    } else {
      el = document.createElement('p');
      el.className = 'msg ' + side + ' tail pop' + (prev ? ' cont' : '');
      el.textContent = text;
      var t = document.createElement('span');
      t.className = 't';
      t.innerHTML = now() + (side === 'out' ? CHECK : '');
      el.appendChild(t);
    }
    feed.appendChild(el);
    feed.scrollTop = feed.scrollHeight;
  }
  function typing(on) {
    status.innerHTML = on ? '<span class="typing">داره می‌نویسه<i></i><i></i><i></i></span>' : 'ربات';
  }
  kb.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b || busy) return;
    busy = true;
    b.disabled = true;
    add('out', b.textContent);
    var lines = answers[b.dataset.q].slice();
    setTimeout(function () { typing(true); }, 500);
    (function next(delay) {
      setTimeout(function () {
        add('in', lines.shift());
        if (lines.length) {
          next(900);
        } else {
          typing(false);
          busy = false;
          minute = Math.min(minute + 1, 59);
          if (!kb.querySelector('button:not(:disabled)')) {
            kb.querySelectorAll('button').forEach(function (x) { x.disabled = false; });
          }
        }
      }, delay);
    })(1300);
  });
})();
