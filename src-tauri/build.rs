fn main() {
  tauri_build::build();
  embed_resource::compile("tr_study-manifest.rc");
}
