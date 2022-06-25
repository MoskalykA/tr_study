use arc_swap::ArcSwap;
use std::sync::Arc;
use rand::Rng;
use eval::eval;
use crate::stats::{init_save_file, get_content, write_content};

lazy_static! {
   static ref CALCUL: ArcSwap<&'static str> = {
      ArcSwap::from(Arc::new(""))
   };
}

fn get_random_number(max: u8) -> u8 {
   let num = rand::thread_rng().gen_range(0..max);
   num
}

fn get_random_operator() -> String {
   let num = rand::thread_rng().gen_range(0..3);
   match num {
      0 => "+".to_string(),
      1 => "-".to_string(),
      2 => "*".to_string(),
      3 => "/".to_string(),
      _ => "".to_string()
   }
}

#[tauri::command]
pub fn random_calcul() -> String {
   let mut calcul = "".to_string();
   for _index in 0 .. 1 {
      calcul += &get_random_number(128).to_string();
      calcul += &get_random_operator().to_string();
   }
   calcul += &get_random_number(128).to_string();

   CALCUL.swap(Arc::new(Box::leak(calcul.clone().into_boxed_str())));
   calcul
}

#[tauri::command]
pub fn validate_calcul(calcul: String) -> bool {
   init_save_file();

   let calcul_is_valid = calcul == eval(**CALCUL.load()).unwrap().to_string();
   if calcul_is_valid {
      let mut stats = get_content();
      stats.math.number_of_successes += 1;

      write_content(stats);
   } else {
      let mut stats = get_content();
      stats.math.number_of_defeats += 1;
      
      write_content(stats);
   }

   calcul_is_valid
}