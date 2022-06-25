#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[macro_use]
extern crate lazy_static;

mod stats;
mod calcul;

use crate::calcul::{validate_calcul, random_calcul};

fn main() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      random_calcul,
      validate_calcul
    ])
    .run(context)
    .expect("error while running tauri application");
}