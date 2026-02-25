const axios = require("axios");
const fs = require("fs");

class GitHubUploadService {
    constructor() {
        this.token = process.env.GITHUB_TOKEN;
        this.owner = process.env.GITHUB_OWNER;
        this.repo = process.env.GITHUB_REPO;
        this.branch = process.env.GITHUB_BRANCH || "main";
    }

    async uploadFile(file, pathOnRepo) {
        const apiUrl = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${pathOnRepo}`;

        const fileContent = fs.readFileSync(file.path);
        const base64Content = fileContent.toString("base64");

        let sha = null;
        try {
            const res = await axios.get(apiUrl, {
                headers: { Authorization: `token ${this.token}` }
            });
            sha = res.data.sha;
        } catch (err) { }

        const body = {
            message: `Upload or update file ${file.originalname}`,
            content: base64Content,
            branch: this.branch,
        };

        if (sha) body.sha = sha;

        const uploadRes = await axios.put(apiUrl, body, {
            headers: {
                Authorization: `token ${this.token}`,
                "Content-Type": "application/json"
            }
        });

        const uploaded = uploadRes.data.content;
        const filePath = uploaded.path;

        return `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/${filePath}`;
    }
}

module.exports = GitHubUploadService;
