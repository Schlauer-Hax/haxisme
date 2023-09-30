FROM denoland/deno:1.36.4

EXPOSE 3000
WORKDIR /server
COPY . .

CMD ["deno", "task", "start"]
