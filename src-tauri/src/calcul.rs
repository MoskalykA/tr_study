use crate::{
    statistics::{get_statistics_content, write_statistics_content, OldCalcul},
    AppData,
};
use eval::eval;
use rand::Rng;
use serde::{Deserialize, Serialize};

fn get_random_number(max: u8) -> u8 {
    rand::thread_rng().gen_range(0..max)
}

fn get_random_operator() -> String {
    let num = rand::thread_rng().gen_range(0..3);
    match num {
        0 => " + ".to_string(),
        1 => " - ".to_string(),
        2 => " * ".to_string(),
        3 => " / ".to_string(),
        _ => unimplemented!("random operator"),
    }
}

#[tauri::command]
pub fn random_calcul(app_data: tauri::State<'_, AppData>) -> String {
    let mut current_calcul = app_data.current_calcul.lock().unwrap();
    *current_calcul = String::default();

    for _ in 0..1 {
        *current_calcul += &get_random_number(128).to_string();
        *current_calcul += &get_random_operator().to_string();
        *current_calcul += &get_random_number(128).to_string();
    }

    current_calcul.clone()
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CalculResponse {
    pub correction: String,
    pub correct_answer: bool,
}

#[tauri::command]
pub fn validate_calcul(
    app_data: tauri::State<'_, AppData>,
    calcul: String,
    time: f32,
) -> CalculResponse {
    let statistics_file = app_data.statistics_file.lock().unwrap().clone();

    let mut stats = get_statistics_content(statistics_file.clone());
    let current_calcul = app_data.current_calcul.lock().unwrap().clone();
    let eval = eval(&current_calcul).unwrap().to_string();

    let calcul_is_valid = calcul == eval;
    if calcul_is_valid {
        stats.number_of_successes += 1;
        stats.old_calculs.push(OldCalcul {
            calcul: current_calcul,
            solution: eval.clone(),
            response: calcul,
            time,
        });
    } else {
        stats.number_of_defeats += 1;
        stats.old_calculs.push(OldCalcul {
            calcul: current_calcul,
            solution: eval.clone(),
            response: calcul,
            time,
        });
    }

    write_statistics_content(statistics_file, stats);

    CalculResponse {
        correction: eval,
        correct_answer: calcul_is_valid,
    }
}
