import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

const platforms = {
  mac: { label: 'macOS', command: 'xcode-select --install', alternativeLabel: 'Prefer Homebrew?', alternative: 'brew install git', note: 'Installs Apple’s Command Line Tools, which include git.' },
  linux: { label: 'Linux', command: 'sudo apt install git', alternativeLabel: 'Fedora / RHEL', alternative: 'sudo dnf install git', note: 'On Arch: sudo pacman -S git.' },
  win: { label: 'Windows', command: 'winget install --id Git.Git -e', alternativeLabel: 'Using Scoop?', alternative: 'scoop install git', note: 'Includes Git Bash and Git Credential Manager.' },
};
type Platform = keyof typeof platforms;
const platformKeys = Object.keys(platforms) as Platform[];

export default function GitInstaller() {
  const [platform, setPlatform] = useState<Platform>('mac');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const command = useRef<HTMLElement>(null);
  const request = useRef(0);
  const current = platforms[platform];

  useEffect(() => {
    const agent = navigator.userAgent.toLowerCase();
    if (agent.includes('windows')) setPlatform('win');
    else if (agent.includes('linux') && !agent.includes('android')) setPlatform('linux');
  }, []);

  useEffect(() => {
    if (copyState === 'idle') return;
    const timer = window.setTimeout(() => setCopyState('idle'), 2500);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  function selectPlatform(next: Platform) {
    request.current++;
    setPlatform(next);
    setCopyState('idle');
  }

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % platformKeys.length;
    else if (event.key === 'ArrowLeft') next = (index + platformKeys.length - 1) % platformKeys.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = platformKeys.length - 1;
    else return;
    event.preventDefault();
    selectPlatform(platformKeys[next]);
    tabs.current[next]?.focus();
  }

  async function copyCommand() {
    const attempt = ++request.current;
    try {
      await navigator.clipboard.writeText(current.command);
      if (attempt === request.current) setCopyState('copied');
    } catch {
      if (attempt !== request.current) return;
      setCopyState('error');
      if (command.current) {
        const range = document.createRange();
        range.selectNodeContents(command.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }

  return (
    <aside className="git-installer" aria-labelledby="classic-git-title">
      <div className="installer-titlebar"><span /><span /><span /><code>install — classic git</code></div>
      <div className="installer-body">
        <div>
          <p className="installer-eyebrow">Just need git v1?</p>
          <h2 id="classic-git-title">Install the standard client in one line.</h2>
        </div>
        <div className="installer-tabs" role="tablist" aria-label="Operating system">
          {platformKeys.map((key, index) => (
            <button key={key} ref={(element) => { tabs.current[index] = element; }} type="button" role="tab"
              id={`install-tab-${key}`} aria-selected={platform === key} aria-controls="install-panel"
              tabIndex={platform === key ? 0 : -1} onClick={() => selectPlatform(key)} onKeyDown={(event) => moveTab(event, index)}>
              {platforms[key].label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id="install-panel" aria-labelledby={`install-tab-${platform}`} tabIndex={0}>
          <div className="installer-commands">
            <div className="installer-command">
              <span className="command-prompt" aria-hidden="true">$</span>
              <code ref={command}>{current.command}</code>
              <button type="button" onClick={copyCommand} aria-label="Copy install command">{copyState === 'copied' ? 'Copied' : 'Copy'}</button>
            </div>
            <div className="installer-alternative"><span>{current.alternativeLabel}</span><code><span className="command-prompt" aria-hidden="true">$ </span>{current.alternative}</code></div>
          </div>
          <p className="installer-note">{current.note} Verify with <code>git --version</code></p>
        </div>
        <span className="copy-status" role="status" aria-live="polite">{copyState === 'copied' ? 'Install command copied.' : copyState === 'error' ? 'Could not copy automatically. Select and copy the command above.' : ''}</span>
        <div className="installer-footer"><span aria-hidden="true">→</span><p>When your diffs outgrow it, <a href="/#tour">Diff Digest</a> reads the same local repos. Nothing to migrate.</p></div>
      </div>
    </aside>
  );
}
