FROM denoland/deno:1.36.4

EXPOSE 3000
WORKDIR /server

CMD ["deno", "run", "-A", "--unstable", "app.ts"]
