# Imagem base Nginx Alpine ultra-leve (~20MB)
FROM nginx:alpine

# Remove página padrão
RUN rm -rf /usr/share/nginx/html/*

# Copia arquivos do site
COPY . /usr/share/nginx/html/

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Porta HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
