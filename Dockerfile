FROM node:20.5.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 5173
EXPOSE 5173

# Build for production
RUN npm run build

# Remove other files

RUN rm -rf src
RUN rm -rf public
RUN rm -rf .git
RUN rm -rf .gitignore
RUN rm -rf README.md
RUN rm -rf tailwind.config.cjs
RUN rm -rf postcss.config.cjs
RUN rm -rf vite.config.js
RUN rm -rf .env.example

# Run the app
CMD [ "npm", "run", "preview" ]