// Replace these variables with your repo details
const owner = "0689436";
const repo = "dot-toucher";
const branch = "main"; // Replace with your branch name

// GitHub API URL to fetch commits
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}&per_page=1`;

export async function getTotalCommits() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    // Total commits are found in the `Link` header (if paginated)
    const linkHeader = response.headers.get("Link");
    if (linkHeader) {
      const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
      if (match) {
        const totalCommits = parseInt(match[1], 10);
        console.log("Total Commits:", totalCommits);
        return totalCommits;
      }
    }

    // If not paginated (only 1 page), return the number of results
    const data = await response.json();
    const totalCommits = data.length;
    console.log("Total Commits:", totalCommits);
    return totalCommits;
  } catch (error) {
    console.error("Error fetching total commits:", error);
    return null;
  }
}
