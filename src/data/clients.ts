// Content and rubric transcribed from the supplied home-page design.
export type DimensionKey = 'xrepo' | 'impact' | 'read' | 'noise' | 'prov' | 'ops' | 'friction' | 'maturity';
export type Weights = Record<DimensionKey, number>;
export type ClientPlatform = 'mac' | 'win' | 'linux';
export type PlatformFilter = 'both' | 'mac' | 'win';
export interface Screenshot { what: string; file: string; caption: string; }
export interface Client {
  id: string; order: number; name: string; initials: string; vendor: string; provisional?: boolean;
  s: Weights; platforms: ClientPlatform[]; platformNote: string; bestFor: string; blurb: string;
  pros: string[]; cons: string[]; priceHead: string; priceDetail: string;
  url: string; urlLabel: string; cta: string; shots: Screenshot[];
}

export const dimensions: { key: DimensionKey; short: string; label: string; hint: string }[] = [
  {
    "key": "xrepo",
    "short": "Cross-repo",
    "label": "Cross-repo visibility",
    "hint": "See change across every repo you own in one view"
  },
  {
    "key": "impact",
    "short": "Impact",
    "label": "Impact weighting",
    "hint": "Big changes look big; lockfile bumps look small"
  },
  {
    "key": "read",
    "short": "Readability",
    "label": "Diff readability",
    "hint": "Moves, renames and word-level edits shown as what they are"
  },
  {
    "key": "noise",
    "short": "Noise",
    "label": "Noise filtering",
    "hint": "Whitespace, generated files and churn set aside"
  },
  {
    "key": "prov",
    "short": "Provenance",
    "label": "Authorship & provenance",
    "hint": "Blame, line history, and which lines an AI wrote"
  },
  {
    "key": "ops",
    "short": "Operations",
    "label": "Working-tree & merge ops",
    "hint": "Staging, rebasing, resolving conflicts"
  },
  {
    "key": "friction",
    "short": "Friction",
    "label": "Friction & availability",
    "hint": "Price, platforms and setup effort"
  },
  {
    "key": "maturity",
    "short": "Maturity",
    "label": "Maturity & ecosystem",
    "hint": "Years of hardening, integrations, community"
  }
];

export const presets: { id: string; label: string; w: Weights }[] = [
  {
    "id": "default",
    "label": "GitClient default",
    "w": {
      "xrepo": 20,
      "impact": 15,
      "read": 15,
      "noise": 10,
      "prov": 10,
      "ops": 15,
      "friction": 10,
      "maturity": 5
    }
  },
  {
    "id": "onerepo",
    "label": "I live in one repo",
    "w": {
      "xrepo": 0,
      "impact": 5,
      "read": 25,
      "noise": 10,
      "prov": 10,
      "ops": 30,
      "friction": 15,
      "maturity": 5
    }
  },
  {
    "id": "team",
    "label": "I review a team’s work",
    "w": {
      "xrepo": 25,
      "impact": 25,
      "read": 15,
      "noise": 15,
      "prov": 10,
      "ops": 0,
      "friction": 5,
      "maturity": 5
    }
  },
  {
    "id": "agents",
    "label": "I supervise AI agents",
    "w": {
      "xrepo": 15,
      "impact": 20,
      "read": 15,
      "noise": 10,
      "prov": 30,
      "ops": 5,
      "friction": 5,
      "maturity": 0
    }
  },
  {
    "id": "everything",
    "label": "I want one client for everything",
    "w": {
      "xrepo": 10,
      "impact": 0,
      "read": 15,
      "noise": 5,
      "prov": 5,
      "ops": 35,
      "friction": 15,
      "maturity": 15
    }
  }
];

export const clients: Client[] = [
  {
    "id": "diff-digest",
    "order": 1,
    "name": "Diff Digest",
    "initials": "DD",
    "vendor": "GitClear, which runs this site",
    "s": {
      "xrepo": 5,
      "impact": 5,
      "read": 5,
      "noise": 5,
      "prov": 5,
      "ops": 1,
      "friction": 3,
      "maturity": 1
    },
    "platforms": [
      "mac"
    ],
    "platformNote": "Apple Silicon, macOS 13+. Windows and Linux planned.",
    "bestFor": "reviewing a week of change across many repos and agents",
    "blurb": "Opens on one feed of change across every repository and organization you point it at, with each commit sized by Diff Delta, so a subsystem rewrite looks bigger than a lockfile bump. Its diffs name six kinds of change instead of two and label which lines a model wrote. It doesn’t stage, rebase or resolve conflicts, so keep a daily-driver client beside it.",
    "pros": [
      "The only cross-repo, cross-organization change feed in the category",
      "Moves, renames and find-and-replace shown as what they are",
      "Per-line AI attribution, down to the model"
    ],
    "cons": [
      "No staging, rebasing or conflict resolution",
      "macOS only for now"
    ],
    "priceHead": "Free",
    "priceDetail": "Free forever on up to 10 repos. Pro is $5 a month or $48 a year, and a lifetime license is $99 once.",
    "url": "https://www.gitclear.com/download_diff_digest",
    "urlLabel": "gitclear.com",
    "cta": "Download Diff Digest",
    "shots": [
      {
        "what": "cross-repo activity feed",
        "file": "diff-digest-hero.webp",
        "caption": "The landing view: forty commits across five repos as one feed, each sized by Diff Delta."
      },
      {
        "what": "per-line AI attribution",
        "file": "diff-digest-ai-attribution.webp",
        "caption": "Every added line names its author, human or model, beside review progress."
      }
    ]
  },
  {
    "id": "gitkraken",
    "order": 2,
    "name": "GitKraken",
    "initials": "GK",
    "vendor": "GitKraken",
    "s": {
      "xrepo": 3,
      "impact": 1,
      "read": 3,
      "noise": 2,
      "prov": 3,
      "ops": 5,
      "friction": 3,
      "maturity": 5
    },
    "platforms": [
      "mac",
      "win",
      "linux"
    ],
    "platformNote": "",
    "bestFor": "one client that does everything",
    "blurb": "The most complete all-round client you can download: a polished commit graph, interactive rebase, hunk staging and a strong conflict editor. Workspaces gather many repositories into one dashboard of branch status and pull requests, the best multi-repo effort among established clients, though reading what changed still happens one repository at a time.",
    "pros": [
      "Best-in-class git operations and hosting integrations",
      "Workspaces: branch status and pull requests across repos"
    ],
    "cons": [
      "No unified feed of change across repositories",
      "Private repos need a subscription; heavy Electron app"
    ],
    "priceHead": "From $4.95 / user / month",
    "priceDetail": "Free tier for public repositories. Pro is billed annually; Advanced is $14 per user per month.",
    "url": "https://www.gitkraken.com/download",
    "urlLabel": "gitkraken.com",
    "cta": "Download GitKraken",
    "shots": [
      {
        "what": "annotated window layout",
        "file": "gitkraken-sample-interface.png",
        "caption": "Annotated overview of the repository sidebar, commit graph, and commit panel. Workspaces sit on a separate tab."
      },
      {
        "what": "full-screen diff",
        "file": "gitkraken-full-screen-diff.jpg",
        "caption": "Full-screen diff with word-level highlighting."
      },
      {
        "what": "file diff pane",
        "file": "gitkraken-history.webp",
        "caption": "A cropped file diff with word-level highlights."
      }
    ]
  },
  {
    "id": "fork",
    "order": 3,
    "name": "Fork",
    "initials": "Fk",
    "vendor": "Dan and Tanya Pristupov",
    "s": {
      "xrepo": 2,
      "impact": 0,
      "read": 3,
      "noise": 2,
      "prov": 3,
      "ops": 5,
      "friction": 5,
      "maturity": 4
    },
    "platforms": [
      "mac",
      "win"
    ],
    "platformNote": "",
    "bestFor": "daily git work, one repo at a time",
    "blurb": "A native, fast client with a full operations suite behind a one-time license. The commit graph stays smooth on histories that slow other apps down, merge commits collapse, and interactive rebase is drag-and-drop. The Repository Manager sorts repos into groups, and each one opens in its own tab.",
    "pros": [
      "Fastest, smoothest commit graph in the category",
      "Full git operations, paid for once"
    ],
    "cons": [
      "One repository per view",
      "No Linux build"
    ],
    "priceHead": "$59.99 once",
    "priceDetail": "Free evaluation. One license covers one user on up to three machines.",
    "url": "https://git-fork.com/",
    "urlLabel": "git-fork.com",
    "cta": "Download Fork",
    "shots": [
      {
        "what": "commit graph and changeset",
        "file": "git-fork-history.jpg",
        "caption": "A native commit graph that stays quick on long histories."
      },
      {
        "what": "side-by-side diff",
        "file": "git-fork-diff-view.jpg",
        "caption": "Side-by-side diff with character-level highlights."
      },
      {
        "what": "Repository Manager",
        "file": "git-fork-base-ui.jpg",
        "caption": "The Repository Manager groups repos; each still opens in its own tab."
      }
    ]
  },
  {
    "id": "tower",
    "order": 4,
    "name": "Tower",
    "initials": "Tw",
    "vendor": "fournova",
    "s": {
      "xrepo": 2,
      "impact": 0,
      "read": 3,
      "noise": 2,
      "prov": 3,
      "ops": 5,
      "friction": 3,
      "maturity": 5
    },
    "platforms": [
      "mac",
      "win"
    ],
    "platformNote": "",
    "bestFor": "a polished, guided client for teams",
    "blurb": "Fifteen years of polish show in drag-and-drop for nearly everything, undo for operations people dread in a terminal, and a History view that can merge several branches into one timeline. Repositories are bookmarked and foldered rather than combined, and every plan is a subscription.",
    "pros": [
      "The most refined operations UX, with undo for risky actions",
      "Several branches in one combined history"
    ],
    "cons": [
      "Subscription only, no free tier",
      "No view across repositories"
    ],
    "priceHead": "$69 a year",
    "priceDetail": "Basic, for one user. Pro is $129 a year. Both include the Mac and Windows apps and a 30-day trial.",
    "url": "https://www.git-tower.com/",
    "urlLabel": "git-tower.com",
    "cta": "Download Tower",
    "shots": [
      {
        "what": "History view",
        "file": "git-tower-branch.jpg",
        "caption": "History can combine several branches into one timeline."
      },
      {
        "what": "Working Copy staging",
        "file": "git-tower-repo-history.jpg",
        "caption": "Working Copy with hunk-level staging."
      },
      {
        "what": "diff pane",
        "file": "git-tower-small-diff.jpg",
        "caption": "The diff pane, cropped to the change."
      }
    ]
  },
  {
    "id": "smartgit",
    "order": 5,
    "name": "SmartGit",
    "initials": "SG",
    "vendor": "syntevo",
    "s": {
      "xrepo": 2,
      "impact": 0,
      "read": 3,
      "noise": 2,
      "prov": 3,
      "ops": 5,
      "friction": 3,
      "maturity": 4
    },
    "platforms": [
      "mac",
      "win",
      "linux"
    ],
    "platformNote": "",
    "bestFor": "power users who want every git feature",
    "blurb": "Exposes more of git’s surface than any other GUI, with a thorough Log graph and side-by-side diffs. The vendor has ruled out a combined multi-repo log as too expensive to compute, so history stays per repository, in a window separate from the working tree. Free for hobby, student and open-source use.",
    "pros": [
      "Deepest git feature coverage of any GUI",
      "Free for non-commercial use"
    ],
    "cons": [
      "Log lives in a separate window",
      "Dated look and feel"
    ],
    "priceHead": "Free for non-commercial use",
    "priceDetail": "Hobby, student and open-source licenses are free. Commercial use starts at $5 per user per month, or buy a perpetual license.",
    "url": "https://www.smartgit.dev/",
    "urlLabel": "smartgit.dev",
    "cta": "Download SmartGit",
    "shots": [
      {
        "what": "Log window",
        "file": "smartgit-repo-history.jpg",
        "caption": "The Log window: repository list, graph and side-by-side diff."
      },
      {
        "what": "index vs. working tree",
        "file": "smartgit-diff.jpg",
        "caption": "Index against working tree, with unified, side-by-side and compact modes."
      }
    ]
  },
  {
    "id": "sublime-merge",
    "order": 6,
    "name": "Sublime Merge",
    "initials": "SM",
    "vendor": "Sublime HQ",
    "s": {
      "xrepo": 1,
      "impact": 0,
      "read": 4,
      "noise": 2,
      "prov": 3,
      "ops": 4,
      "friction": 4,
      "maturity": 5
    },
    "platforms": [
      "mac",
      "win",
      "linux"
    ],
    "platformNote": "",
    "bestFor": "keyboard-driven developers",
    "blurb": "Starts instantly, runs from a command palette, and draws the sharpest sub-line diffs of any established client. It’s also the strictest about scope, with one repository per window. Evaluation never expires, and a personal license is a one-time purchase.",
    "pros": [
      "Precise word- and character-level diffs",
      "Keyboard-first and very fast"
    ],
    "cons": [
      "One repository per window",
      "Moved code still shows as a delete plus an add"
    ],
    "priceHead": "$99 once",
    "priceDetail": "Personal license with three years of updates. Business seats are $75 per user per year.",
    "url": "https://www.sublimemerge.com/",
    "urlLabel": "sublimemerge.com",
    "cta": "Download Sublime Merge",
    "shots": [
      {
        "what": "three-column layout",
        "file": "sublime-repo-view.jpg",
        "caption": "Locations, commits and a file diff in three columns."
      },
      {
        "what": "hunk history",
        "file": "sublime-diff-view.jpg",
        "caption": "Hunk history with sub-line highlighting."
      },
      {
        "what": "hunk staging",
        "file": "sublime-homepage.jpg",
        "caption": "Hunk staging and commit editing in the dark theme."
      }
    ]
  },
  {
    "id": "lazygit",
    "order": 7,
    "name": "Lazygit",
    "initials": "Lg",
    "vendor": "Jesse Duffield and contributors",
    "s": {
      "xrepo": 1,
      "impact": 0,
      "read": 2,
      "noise": 1,
      "prov": 2,
      "ops": 5,
      "friction": 5,
      "maturity": 4
    },
    "platforms": [
      "mac",
      "win",
      "linux"
    ],
    "platformNote": "Runs in a terminal.",
    "bestFor": "terminal-first developers",
    "blurb": "A terminal UI that puts interactive rebase, hunk staging and branch surgery a keystroke away. It’s free, open source and instant on every platform. History is rows of text in a five-panel layout, one repository per instance.",
    "pros": [
      "Full git operations at keyboard speed",
      "Free, and runs anywhere a terminal does"
    ],
    "cons": [
      "Text-only history",
      "One repository per instance"
    ],
    "priceHead": "Free",
    "priceDetail": "Open source under the MIT license.",
    "url": "https://github.com/jesseduffield/lazygit",
    "urlLabel": "github.com",
    "cta": "Get Lazygit on GitHub",
    "shots": [
      {
        "what": "five-panel terminal UI",
        "file": "lazygit-home.jpg",
        "caption": "Status, files, branches, commits and diff in one terminal."
      },
      {
        "what": "staged vs. unstaged diff",
        "file": "lazygit-diff.jpg",
        "caption": "Unstaged and staged changes side by side."
      },
      {
        "what": "recent repos switcher",
        "file": "lazy-git-repo-history.jpg",
        "caption": "Switching repositories from the recent-repos popup."
      }
    ]
  },
  {
    "id": "sourcetree",
    "order": 8,
    "name": "Sourcetree",
    "initials": "St",
    "vendor": "Atlassian",
    "s": {
      "xrepo": 2,
      "impact": 0,
      "read": 2,
      "noise": 2,
      "prov": 2,
      "ops": 4,
      "friction": 3,
      "maturity": 4
    },
    "platforms": [
      "mac",
      "win"
    ],
    "platformNote": "",
    "bestFor": "a free, full-featured GUI",
    "blurb": "Atlassian’s free client gave a generation of developers the colored-lines commit graph, and it still offers a complete GUI at no cost. The interface has aged and large repositories can feel slow, but it remains a capable default, especially for teams already on Bitbucket and Jira.",
    "pros": [
      "Complete GUI at no cost",
      "Familiar to a huge installed base"
    ],
    "cons": [
      "Slow on large repositories",
      "Dated interface"
    ],
    "priceHead": "Free",
    "priceDetail": "Free from Atlassian for personal and commercial use.",
    "url": "https://www.sourcetreeapp.com/",
    "urlLabel": "sourcetreeapp.com",
    "cta": "Download Sourcetree",
    "shots": [
      {
        "what": "History graph",
        "file": "sourcetree-repo-view.jpg",
        "caption": "History with the classic colored-lines graph."
      },
      {
        "what": "file status",
        "file": "sourcetree-file-status.jpg",
        "caption": "Staged and unstaged files beside a unified diff."
      }
    ]
  },
  {
    "id": "sourcegit",
    "order": 9,
    "name": "SourceGit",
    "initials": "SrG",
    "vendor": "the sourcegit-scm project",
    "provisional": true,
    "s": {
      "xrepo": 2,
      "impact": 0,
      "read": 2,
      "noise": 1,
      "prov": 2,
      "ops": 4,
      "friction": 4,
      "maturity": 2
    },
    "platforms": [
      "mac",
      "win",
      "linux"
    ],
    "platformNote": "macOS builds are unsigned.",
    "bestFor": "a free, open-source GUI on any OS",
    "blurb": "An open-source client built on .NET and Avalonia that runs on Windows, macOS and Linux. It covers the core workflow, including interactive rebase, worktrees, blame and AI-drafted commit messages, and ships new releases often. macOS builds are unsigned, so the first launch needs one extra terminal command.",
    "pros": [
      "Free and open source on all three platforms",
      "Interactive rebase, worktrees and blame built in"
    ],
    "cons": [
      "Younger project with a smaller ecosystem",
      "Unsigned macOS builds"
    ],
    "priceHead": "Free",
    "priceDetail": "Open source under the MIT license.",
    "url": "https://github.com/sourcegit-scm/sourcegit",
    "urlLabel": "github.com",
    "cta": "Get SourceGit on GitHub",
    "shots": [
      {
        "what": "commit graph",
        "file": "New capture needed",
        "caption": "The commit graph in the built-in light theme."
      }
    ]
  },
  {
    "id": "github-desktop",
    "order": 10,
    "name": "GitHub Desktop",
    "initials": "GD",
    "vendor": "GitHub",
    "s": {
      "xrepo": 1,
      "impact": 0,
      "read": 2,
      "noise": 1,
      "prov": 0,
      "ops": 3,
      "friction": 5,
      "maturity": 5
    },
    "platforms": [
      "mac",
      "win"
    ],
    "platformNote": "",
    "bestFor": "learning git",
    "blurb": "The gentlest on-ramp git has: free, simple, and built to make a first commit feel safe. History is a flat list with no branch graph and no blame view, and only one repository is visible at a time. Start here if you’re learning git, and move on when it starts to feel small.",
    "pros": [
      "Free and beginner-friendly",
      "Tight GitHub integration"
    ],
    "cons": [
      "No blame view and no branch graph",
      "One repository at a time"
    ],
    "priceHead": "Free",
    "priceDetail": "Open source under the MIT license.",
    "url": "https://desktop.github.com/",
    "urlLabel": "desktop.github.com",
    "cta": "Download GitHub Desktop",
    "shots": [
      {
        "what": "History list",
        "file": "New capture needed",
        "caption": "History as a flat list, one repository at a time."
      }
    ]
  },
  {
    "id": "gitbutler",
    "order": 11,
    "name": "GitButler",
    "initials": "GB",
    "vendor": "GitButler",
    "s": {
      "xrepo": 1,
      "impact": 0,
      "read": 2,
      "noise": 1,
      "prov": 1,
      "ops": 4,
      "friction": 3,
      "maturity": 2
    },
    "platforms": [
      "mac",
      "win",
      "linux"
    ],
    "platformNote": "",
    "bestFor": "juggling several streams of work in progress",
    "blurb": "Rethinks how you compose work in progress: virtual branches appear as parallel lanes you drag changes between, so several streams of work share one working directory. It’s young and still maturing, and it focuses on organizing new work more than reading past change.",
    "pros": [
      "Virtual branches, the most original work-in-progress model in years",
      "Free for individuals"
    ],
    "cons": [
      "Young and still maturing",
      "Little help reading history"
    ],
    "priceHead": "Free for individuals",
    "priceDetail": "Paid plans start at $10 a month.",
    "url": "https://gitbutler.com/",
    "urlLabel": "gitbutler.com",
    "cta": "Download GitButler",
    "shots": [
      {
        "what": "virtual branch lanes",
        "file": "New capture needed",
        "caption": "Virtual branches as parallel lanes in one working directory."
      }
    ]
  }
];
