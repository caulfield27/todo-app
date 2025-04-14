export function handleThemeChange(theme: string | null){
    if (theme) {
        const root = document.documentElement;
        if (theme === "dark") {
          root.style.setProperty("--defaultColor", "#fdf9f9");
          root.style.setProperty("--container-bg", "#481E14");
          root.style.setProperty("--header-color", "#ffffff");
          root.style.setProperty("--sidebar-bg", "#9B3922");
          root.style.setProperty("--primaryRed", "#ff4c4c");
          root.style.setProperty("--secondaryRed", "#a80000");
          root.style.setProperty("--hover-color", "#740000");
          root.style.setProperty("--default-box-shadow", "none");
          root.style.setProperty("--nav-link-hover", "#ffd5d5");
          root.style.setProperty("--add-task-hover", "#ff815b");
          root.style.setProperty("--cancel-btn-bg", "#ffffff");
          root.style.setProperty("--confirm-btn-bg", "#ffbb00");
          root.style.setProperty("--default-btn-color", "#000000");
          root.style.setProperty("--modal-bg", "#242424");
          root.style.setProperty("--modal-color", "#f1f1f1");
          root.style.setProperty("--default-bg-hover", "#424242")
          root.style.setProperty("--table-checkbox-color", "#ff815b");
          root.style.setProperty("--table-actions-color", "#ffffff");
          root.style.setProperty("--delete-hover-color", "#ff815b"); 
          root.style.setProperty("--update-hover-color", "#7d7de7");
          root.style.setProperty("--expired-span-color", "#ff815b");
          root.style.setProperty("--row-divider-color", "#b34f38");
          root.style.setProperty("--error-color", "#ff815b");
        } else {
          root.style.setProperty("--defaultColor", "#696666");
          root.style.setProperty("--container-bg", "#fdf9f9");
          root.style.setProperty("--header-color", "#000000");
          root.style.setProperty("--sidebar-bg", "#ffffff");
          root.style.setProperty("--primaryRed", "#db1414");
          root.style.setProperty("--hover-color", "#dcdcdc");
          root.style.setProperty("--secondaryRed", "#740000");
          root.style.setProperty("--default-box-shadow", "0px 0px 8px -3px gray");
          root.style.setProperty("--nav-link-hover", "#e1ffe1");
          root.style.setProperty("--add-task-hover", "#23e0c7");
          root.style.setProperty("--cancel-btn-bg", "#db1414");
          root.style.setProperty("--confirm-btn-bg", "#1a1ace");
          root.style.setProperty("--default-btn-color", "#ffffff");
          root.style.setProperty("--modal-bg", "#ffffff");
          root.style.setProperty("--modal-color", "#696666");
          root.style.setProperty("--default-bg-hover", "whitesmoke")
          root.style.setProperty("--table-checkbox-color", "#0000ff");
          root.style.setProperty("--table-actions-color", "#aaa4a4");
          root.style.setProperty("--delete-hover-color", "#ff0000"); 
          root.style.setProperty("--update-hover-color", "#7d7de7");
          root.style.setProperty("--expired-span-color", "#ff0000");
          root.style.setProperty("--row-divider-color", "#dcdcdc");
          root.style.setProperty("--error-color", "#ff0000")
        }
      }
}