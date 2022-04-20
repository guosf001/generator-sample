1、先创建可执行的脚本，用当前环境 node 来执行这个包 #! /usr/bin/env node 
2、添加 package.json bin 命令 "bin": "./bin/gsf" bin: { "gsf": "./bin/gsf", "gsf-cli": "./bin/" } 
3、把包临时链接到本地 npm link --force,  不需要的话npm unlink

