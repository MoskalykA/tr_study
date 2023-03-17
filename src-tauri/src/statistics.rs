use crate::AppData;
use serde::{Deserialize, Serialize};
use std::fs;

#[derive(Serialize, Deserialize, Clone)]
pub struct OldCalcul {
    pub calcul: String,
    pub solution: String,
    pub response: String,
    pub time: f32,
}

#[derive(Serialize, Deserialize, Clone, Default)]
#[serde(rename_all = "camelCase")]
pub struct Stats {
    pub number_of_successes: u32,
    pub number_of_defeats: u32,
    pub old_calculs: Vec<OldCalcul>,
}

pub fn get_statistics_content(path: String) -> Stats {
    let content = fs::read_to_string(path).unwrap();
    let statistics: Stats = serde_json::from_str(&content).unwrap();

    statistics
}

pub fn write_statistics_content(path: String, content: Stats) {
    fs::write(path, serde_json::to_string(&content).unwrap()).unwrap();
}

#[tauri::command]
pub fn get_data(app_data: tauri::State<AppData>) -> Stats {
    let statistics_file = app_data.statistics_file.lock().unwrap().clone();
    get_statistics_content(statistics_file)
}

#[tauri::command]
pub fn get_average_time(app_data: tauri::State<'_, AppData>) -> f32 {
    let mut time: f32 = 0.0;
    let statistics_file = app_data.statistics_file.lock().unwrap().clone();
    let old_calculs = get_statistics_content(statistics_file).old_calculs;
    for calcul in old_calculs.clone().into_iter() {
        time += calcul.time;
    }

    let final_time = time / old_calculs.len() as f32;
    if final_time.is_nan() {
        0.0
    } else {
        final_time
    }
}
