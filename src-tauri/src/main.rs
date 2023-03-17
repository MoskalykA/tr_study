// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod calcul;
mod statistics;

use crate::calcul::{random_calcul, validate_calcul};
use crate::statistics::{get_average_time, get_data};
use statistics::Stats;
use std::sync::Mutex;

#[derive(serde::Serialize)]
pub struct AppData {
    pub current_calcul: Mutex<String>,
    pub statistics_file: Mutex<String>,
}

impl AppData {
    fn new(statistics_file: String) -> Self {
        Self {
            current_calcul: Mutex::new(String::default()),
            statistics_file: Mutex::new(statistics_file),
        }
    }
}

fn main() {
    let statistics_file = String::from("data.json");
    let app_data = AppData::new(statistics_file.clone());
    if !std::path::Path::new(&statistics_file).exists() {
        std::fs::create_dir_all(std::path::Path::new(&statistics_file).parent().unwrap()).unwrap();

        std::fs::write(
            statistics_file,
            serde_json::to_string(&Stats::default()).unwrap(),
        )
        .unwrap();
    }

    tauri::Builder::default()
        .manage(app_data)
        .invoke_handler(tauri::generate_handler![
            random_calcul,
            validate_calcul,
            get_data,
            get_average_time
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
