(() => {
  "use strict";

  const PASSCODE_HASH = "880e87a0a09e0e025b0424e4c216bbb6e7b0f842acd74f24883b51d49dc83309";
  const STORAGE_KEY = "ahasebe_portfolio_auth_until";
  const ONE_DAY = 24 * 60 * 60 * 1000;

  const isAuthenticated = () => {
    const expiresAt = Number(localStorage.getItem(STORAGE_KEY) || 0);
    return Number.isFinite(expiresAt) && Date.now() < expiresAt;
  };

  const unlock = () => {
    document.getElementById("portfolio-auth-screen")?.remove();
    document.getElementById("portfolio-auth-hide")?.remove();
    document.documentElement.style.visibility = "visible";
  };

  const showLogin = () => {
    const screen = document.createElement("div");
    screen.id = "portfolio-auth-screen";
    screen.style.cssText = [
      "position:fixed", "inset:0", "z-index:2147483647",
      "display:flex", "align-items:center", "justify-content:center",
      "padding:24px", "box-sizing:border-box", "background:#f7f7f5",
      "font-family:-apple-system,BlinkMacSystemFont,'Noto Sans JP',sans-serif",
      "color:#222", "visibility:visible"
    ].join(";");

    const panel = document.createElement("form");
    panel.style.cssText = [
      "width:100%", "max-width:360px", "padding:32px",
      "box-sizing:border-box", "background:#fff", "border:1px solid #e5e5e5",
      "border-radius:12px", "text-align:center", "visibility:visible"
    ].join(";");

    const heading = document.createElement("h1");
    heading.textContent = "Portfolio";
    heading.style.cssText = "margin:0 0 8px;font-size:24px;font-weight:600";

    const description = document.createElement("p");
    description.textContent = "閲覧用パスコードを入力してください";
    description.style.cssText = "margin:0 0 24px;font-size:13px;color:#666";

    const input = document.createElement("input");
    input.type = "password";
    input.autocomplete = "current-password";
    input.placeholder = "パスコード";
    input.setAttribute("aria-label", "パスコード");
    input.required = true;
    input.style.cssText = "display:block;width:100%;box-sizing:border-box;padding:13px 14px;border:1px solid #ccc;border-radius:6px;font-size:16px;margin-bottom:12px";

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "閲覧する";
    button.style.cssText = "width:100%;padding:13px;border:0;border-radius:6px;background:#222;color:#fff;font-size:14px;cursor:pointer";

    const error = document.createElement("p");
    error.setAttribute("role", "alert");
    error.style.cssText = "display:none;margin:14px 0 0;color:#b42318;font-size:13px";
    error.textContent = "パスコードが正しくありません";

    panel.append(heading, description, input, button, error);
    screen.append(panel);
    document.body.append(screen);

    panel.addEventListener("submit", async (event) => {
      event.preventDefault();
      button.disabled = true;
      button.textContent = "確認中…";
      try {
        const bytes = new TextEncoder().encode(input.value);
        const digest = await crypto.subtle.digest("SHA-256", bytes);
        const hash = Array.from(new Uint8Array(digest))
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");

        if (hash === PASSCODE_HASH) {
          localStorage.setItem(STORAGE_KEY, String(Date.now() + ONE_DAY));
          unlock();
        } else {
          error.style.display = "block";
          input.select();
        }
      } catch (e) {
        error.textContent = "認証に失敗しました。HTTPS環境で開いてください。";
        error.style.display = "block";
      } finally {
        button.disabled = false;
        button.textContent = "閲覧する";
      }
    });

    input.focus();
  };

  const hideStyle = document.createElement("style");
  hideStyle.id = "portfolio-auth-hide";
  hideStyle.textContent = "html{visibility:hidden!important}";
  document.head.append(hideStyle);

  if (isAuthenticated()) {
    unlock();
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showLogin, { once: true });
  } else {
    showLogin();
  }
})();