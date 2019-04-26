FROM node:slim
EXPOSE 3000
ADD httple.js .
ADD sample.js . 
CMD node sample.js
