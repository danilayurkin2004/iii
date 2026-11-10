#!/usr/bin/env python3
"""Сборка game_assembled.html из блоков в blocks/ (порядок = оригинал)."""
import os, re
B='blocks'
def read(p): return open(os.path.join(B,p),encoding='utf-8').read()

head   = read('html/head.html')
theme  = read('html/theme-script.js')
body   = read('html/body.html')
css    = ''.join(read('css/'+f) for f in sorted(os.listdir(B+'/css')))
js     = ''.join(read('js/'+f) for f in sorted(os.listdir(B+'/js')))
closing= read('html/closing.html')

# структура оригинала: head -> <script>theme</script><style>css</style></head> -> body -> <script>js</script> -> closing
out = (head
       + '<script>' + theme.rstrip('\n') + '</script>'
       + '<style>' + css.rstrip('\n') + '\n</style>\n</head>\n'
       + body
       + '<script>' + js.rstrip('\n') + '</script>\n'
       + closing)
open('game_assembled.html','w',encoding='utf-8').write(out)
print('built game_assembled.html:', len(out.encode()), 'bytes')
