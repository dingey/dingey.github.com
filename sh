java -jar -Dspring.profiles.active=prod -Dserver.port=8081 -Dlogging.path=logs/web1 web.jar &

tail docker-data/java-pro-01/logs/ptq-service-*.log -f -n100


git pull --no-commit origin master
git diff master target --binary > ../a.patch
git checkout yxzs
git apply ../a.patch
git status



$ docker ps // 查看所有正在运行容器
$ docker stop containerId // containerId 是容器的ID
$ docker ps -a // 查看所有容器
$ docker ps -a -q // 查看所有容器ID
$ docker stop $(docker ps -a -q) //  stop停止所有容器
$ docker  rm $(docker ps -a -q) //   remove删除所有容器
docker run --name mynginx -d -p 80:80  -v /conf/nginx.conf:/etc/nginx/conf.d/default.conf  -v /logs/nginx:/var/log/nginx -d docker.io/nginx
docker exec -i mynginx nginx -s reload

docker exec -it 9fbe362214a6  /bin/bash 
﻿从主机复制到容器sudo docker cp host_path containerID:container_path
从容器复制到主机sudo docker cp containerID:container_path host_path

iptables -A INPUT -ptcp --dport 8081-j ACCEPT
iptables -A OUTPUT -p tcp --dport 8081 -j DROP
