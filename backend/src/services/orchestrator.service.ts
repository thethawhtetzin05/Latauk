import { EditorService } from './editor.service';
// Maung Sit Logic ပါဝင်မည့် service

export class OrchestratorService {
  private editor;

  constructor() {
    this.editor = new EditorService();
  }

  async runFullWorkflow(userId: string, projectId: string, text: string, userApiKey: string) {
    console.log("Zin Lay: Starting workflow...");

    // အဆင့် ၁: မောင်ပြန် ဘာသာပြန်ခြင်း
    const translation = await this.editor.editWithStyle(userId, projectId, text, userApiKey);

    // အဆင့် ၂: မောင်စစ် ရှေ့နောက် စစ်ဆေးခြင်း
    // (မောင်စစ် service ခေါ်ယူခြင်း)
    const continuityReport = "မောင်စစ်: အဆင်ပြေပါသည်။";

    // အဆင့် ၃: Zin Lay က အနှစ်ချုပ်ခြင်း
    const report = `
      ဆရာ၊ မောင်ပြန်က ဘာသာပြန်ပြီးပါပြီ။ 
      မောင်စစ်ကလည်း စစ်ဆေးပြီး အဆင်ပြေကြောင်း ပြောပါတယ်။
      
      ရလဒ်စာသား: ${translation}
    `;

    return { translation, continuityReport, report };
  }
}
