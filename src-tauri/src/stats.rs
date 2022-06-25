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

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct OldCalcul {
   pub calcul: String,
   pub solution: String,
   pub response: String,
   pub time: f32
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct OldWriting {
   pub writing: String,
   pub solution: String,
   pub response: String,
   pub time: f32
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Calcul {
   pub number_of_successes: u32,
   pub number_of_defeats: u32,
   pub old_calculs: Vec<OldCalcul>
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Writing {
   pub number_of_successes: u32,
   pub number_of_defeats: u32,
   pub old_writings: Vec<OldWriting>
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Stats {
   pub calcul: Calcul,
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
      calcul: Calcul {
         number_of_successes: 0,
         number_of_defeats: 0,
         old_calculs: Vec::new()
      },
      writing: Writing {
         number_of_successes: 0,
         number_of_defeats: 0,
         old_writings: Vec::new()
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

#[tauri::command]
pub fn get_average_time(to: String) -> f32 {
   init_save_file();

   if to == "calcul" {
      let mut time: f32 = 0.0;
      let old_calculs = get_content().clone().calcul.old_calculs;
      let len: f32 = old_calculs.len() as f32;
      for calcul in old_calculs.into_iter() {
         time += calcul.time;
      }
   
      let final_time = time / len;
      if final_time.is_nan() { 0.0 } else { final_time }
   } else {
      let mut time: f32 = 0.0;
      let old_writings = get_content().clone().writing.old_writings;
      let len: f32 = old_writings.len() as f32;
      for writing in old_writings.into_iter() {
         time += writing.time;
      }
   
      let final_time = time / len;
      if final_time.is_nan() { 0.0 } else { final_time }
   }
}