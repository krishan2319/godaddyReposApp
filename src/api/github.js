import axios from "axios";

const GITHUB_BASE = "https://api.github.com";

export function getRepos({ page = 1, per_page = 10 }) {
  return axios.get(`${GITHUB_BASE}/orgs/godaddy/repos`, {
    params: { page, per_page },
  }).then(res => res.data);
}

export function getLanguages(languages_url) {
  return axios.get(languages_url).then(res => res.data);
}