FROM denoland/deno

EXPOSE 3000
WORKDIR /server
COPY . .
# RUN deno cache ./server/app.ts

CMD ["deno", "task", "start"]
