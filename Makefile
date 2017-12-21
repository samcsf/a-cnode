build: 
	npm run build
up: build
	node server.js
clean: 
	ssh root@45.78.27.159 -p 29174 'rm -rf /root/a-cnode/dist'	
copy:
	scp -P 29174 -r ./dist root@45.78.27.159:/root/a-cnode/
restart: 
	ssh root@45.78.27.159 -p 29174 'pm2 restart server'	
deploy: build clean copy restart
.PHONY: build up copy restart deploy