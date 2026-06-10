use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let win = app.get_webview_window("main").unwrap();
            let win2 = win.clone();
            win.on_window_event(move |event| {
                if let tauri::WindowEvent::Focused(true) = event {
                    let _ = win2.eval("window.__sebRepaint = Date.now()");
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
