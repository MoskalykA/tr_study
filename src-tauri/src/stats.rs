use std::fs;
use std::path::Path;
use serde::{Deserialize, Serialize};

lazy_static! {
   static ref DIR_PATH: String = if cfg!(dev) {
      "../data/".to_string()
   } else {
      "data".to_string()
   };

   static ref FILE_PATH: String = if cfg!(dev) {
      "../data/app.json".to_string()
   } else {
      "data/app.json".to_string()
   };
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Math {
   pub number_of_successes: u32,
   pub number_of_defeats: u32
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Writing {
   pub number_of_successes: u32,
   pub number_of_defeats: u32
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Stats {
   pub math: Math,
   pub writing: Writing
}

pub fn get_file_path() -> String {
   FILE_PATH.clone()
}

fn get_dir_path() -> String {
   DIR_PATH.clone()
}

fn file_exists() -> bool {
   Path::new(&get_file_path()).exists()
}

fn dir_exists() -> bool {
   Path::new(&get_dir_path()).exists()
}

pub fn init_save_file() {
   if file_exists() {
      return
   }

   if !dir_exists() {
      fs::create_dir(get_dir_path()).unwrap();
   }

   let data_base = Stats {
      math: Math {
         number_of_successes: 0,
         number_of_defeats: 0,
      },
      writing: Writing {
         number_of_successes: 0,
         number_of_defeats: 0,
      },
   };
   fs::write(FILE_PATH.clone(), serde_json::to_string(&data_base).unwrap()).unwrap();
}

pub fn get_content() -> Stats {
   let file_content = fs::read_to_string(get_file_path()).unwrap();
   let to_json: Stats = serde_json::from_str(file_content.as_str()).unwrap();
   to_json
}

pub fn write_content(content: Stats) {
   fs::write(get_file_path(), serde_json::to_string(&content).unwrap()).unwrap();
}

#[tauri::command]
pub fn get_data() -> Stats {
   init_save_file();
   get_content()
}