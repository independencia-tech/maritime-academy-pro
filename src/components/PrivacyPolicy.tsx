const C = {
  navy:"#060e1a", navy2:"#0a1628", navy3:"#0d1f3c",
  gold:"#c9922a", gold2:"#e8b94f",
  blue:"#1a6fd4", blue2:"#4da6ff",
  white:"#f0f4ff", muted:"rgba(240,244,255,0.45)",
  border:"rgba(201,146,42,0.22)",
};

const T: any = {
  fr:{
    title:"POLITIQUE DE CONFIDENTIALITÉ",
    updated:"Dernière mise à jour : Juin 2025",
    sections:[
      {heading:"1. Données collectées",body:"Nous collectons les informations que tu fournis lors de l'inscription : prénom ou nom d'utilisateur, adresse email, langue préférée et département (pont/machine). Si tu utilises Google Sign-In, nous recevons ton nom et email depuis ton compte Google."},
      {heading:"2. Utilisation des données",body:"Tes données sont utilisées uniquement pour : personnaliser ton expérience dans l'app, sauvegarder ta progression, t'envoyer des notifications liées à l'app (mises à jour, lancement officiel) et améliorer nos services."},
      {heading:"3. Stockage et sécurité",body:"Tes données sont stockées de manière sécurisée via Supabase (infrastructure cloud conforme aux standards de sécurité). Nous ne vendons, ne louons et ne partageons jamais tes données personnelles avec des tiers à des fins commerciales."},
      {heading:"4. Cookies et données locales",body:"L'application utilise le stockage local de ton appareil (localStorage) pour sauvegarder ta session, ta progression et tes préférences. Ces données restent sur ton appareil et ne sont pas transmises sans ton consentement."},
      {heading:"5. Tes droits",body:"Tu as le droit d'accéder à tes données, de les rectifier ou de les supprimer à tout moment. Pour exercer ces droits, contacte-nous via l'application. Nous traiterons ta demande dans un délai raisonnable."},
      {heading:"6. Mineurs",body:"L'application est destinée aux personnes de 16 ans et plus. Nous ne collectons pas sciemment de données personnelles auprès de mineurs de moins de 16 ans."},
      {heading:"7. Contact",body:"Pour toute question relative à la protection de tes données personnelles, contacte-nous via l'application ou à l'adresse email indiquée dans le profil du projet."},
    ],
  },
  en:{
    title:"PRIVACY POLICY",
    updated:"Last updated: June 2025",
    sections:[
      {heading:"1. Data Collected",body:"We collect information you provide during registration: first name or username, email address, preferred language and department (deck/engine). If you use Google Sign-In, we receive your name and email from your Google account."},
      {heading:"2. Use of Data",body:"Your data is used solely to: personalize your in-app experience, save your progress, send you app-related notifications (updates, official launch) and improve our services."},
      {heading:"3. Storage and Security",body:"Your data is stored securely via Supabase (cloud infrastructure compliant with security standards). We never sell, rent or share your personal data with third parties for commercial purposes."},
      {heading:"4. Cookies and Local Data",body:"The application uses your device's local storage (localStorage) to save your session, progress and preferences. This data remains on your device and is not transmitted without your consent."},
      {heading:"5. Your Rights",body:"You have the right to access, correct or delete your data at any time. To exercise these rights, contact us through the application. We will process your request within a reasonable time."},
      {heading:"6. Minors",body:"The application is intended for people aged 16 and over. We do not knowingly collect personal data from minors under the age of 16."},
      {heading:"7. Contact",body:"For any questions regarding the protection of your personal data, contact us through the application or at the email address indicated in the project profile."},
    ],
  },
  es:{
    title:"POLÍTICA DE PRIVACIDAD",
    updated:"Última actualización: Junio 2025",
    sections:[
      {heading:"1. Datos recopilados",body:"Recopilamos la información que proporcionas durante el registro: nombre o nombre de usuario, dirección de correo electrónico, idioma preferido y departamento (puente/máquinas). Si usas Google Sign-In, recibimos tu nombre y correo desde tu cuenta de Google."},
      {heading:"2. Uso de los datos",body:"Tus datos se utilizan únicamente para: personalizar tu experiencia en la app, guardar tu progreso, enviarte notificaciones relacionadas con la app (actualizaciones, lanzamiento oficial) y mejorar nuestros servicios."},
      {heading:"3. Almacenamiento y seguridad",body:"Tus datos se almacenan de forma segura a través de Supabase (infraestructura cloud conforme a los estándares de seguridad). Nunca vendemos, alquilamos ni compartimos tus datos personales con terceros con fines comerciales."},
      {heading:"4. Cookies y datos locales",body:"La aplicación utiliza el almacenamiento local de tu dispositivo (localStorage) para guardar tu sesión, progreso y preferencias. Estos datos permanecen en tu dispositivo y no se transmiten sin tu consentimiento."},
      {heading:"5. Tus derechos",body:"Tienes derecho a acceder, rectificar o eliminar tus datos en cualquier momento. Para ejercer estos derechos, contáctanos a través de la aplicación. Procesaremos tu solicitud en un plazo razonable."},
      {heading:"6. Menores",body:"La aplicación está destinada a personas de 16 años en adelante. No recopilamos conscientemente datos personales de menores de 16 años."},
      {heading:"7. Contacto",body:"Para cualquier pregunta sobre la protección de tus datos personales, contáctanos a través de la aplicación o en la dirección de correo indicada en el perfil del proyecto."},
    ],
  },
  pt:{
    title:"POLÍTICA DE PRIVACIDADE",
    updated:"Última atualização: Junho 2025",
    sections:[
      {heading:"1. Dados coletados",body:"Coletamos as informações que você fornece durante o cadastro: nome ou nome de usuário, endereço de e-mail, idioma preferido e departamento (convés/máquinas). Se você usar o Google Sign-In, recebemos seu nome e e-mail da sua conta do Google."},
      {heading:"2. Uso dos dados",body:"Seus dados são usados apenas para: personalizar sua experiência no app, salvar seu progresso, enviar notificações relacionadas ao app (atualizações, lançamento oficial) e melhorar nossos serviços."},
      {heading:"3. Armazenamento e segurança",body:"Seus dados são armazenados com segurança via Supabase (infraestrutura cloud conforme aos padrões de segurança). Nunca vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais."},
      {heading:"4. Cookies e dados locais",body:"O aplicativo usa o armazenamento local do seu dispositivo (localStorage) para salvar sua sessão, progresso e preferências. Esses dados permanecem no seu dispositivo e não são transmitidos sem o seu consentimento."},
      {heading:"5. Seus direitos",body:"Você tem o direito de acessar, corrigir ou excluir seus dados a qualquer momento. Para exercer esses direitos, entre em contato conosco pelo aplicativo. Processaremos sua solicitação em prazo razoável."},
      {heading:"6. Menores",body:"O aplicativo é destinado a pessoas com 16 anos ou mais. Não coletamos conscientemente dados pessoais de menores de 16 anos."},
      {heading:"7. Contato",body:"Para qualquer dúvida sobre a proteção dos seus dados pessoais, entre em contato conosco pelo aplicativo ou no endereço de e-mail indicado no perfil do projeto."},
    ],
  },
};

export default function PrivacyPolicy({
  lang="fr",
  onBack=()=>{},
}:{
  lang?:string;
  onBack?:()=>void;
}) {
  const t=T[lang]||T.fr;

  return (
    <div style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg,${C.navy3} 0%,${C.navy2} 50%,${C.navy} 100%)`,
      color:C.white,fontFamily:"'Nunito',sans-serif",
      overflowX:"hidden",
    }}>
      <div style={{
        position:"sticky",top:0,zIndex:100,
        background:"rgba(6,14,26,0.96)",backdropFilter:"blur(14px)",
        borderBottom:`1px solid ${C.border}`,
        height:54,display:"flex",alignItems:"center",padding:"0 16px",gap:12,
      }}>
        <button onClick={onBack} style={{
          display:"flex",alignItems:"center",gap:7,
          background:"rgba(255,255,255,0.09)",
          border:"1px solid rgba(255,255,255,0.2)",
          borderRadius:10,padding:"8px 14px",
          color:C.white,fontSize:13,fontWeight:700,
          cursor:"pointer",fontFamily:"'Nunito',sans-serif",
        }}>
          {lang==="fr"?"◀ Retour":lang==="es"?"◀ Volver":lang==="pt"?"◀ Voltar":"◀ Back"}
        </button>
      </div>

      <div style={{padding:"28px 20px 60px",maxWidth:640,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:6,letterSpacing:1}}>{t.title}</div>
          <div style={{fontSize:11,color:C.gold,letterSpacing:1,fontFamily:"'Cinzel',serif"}}>Maritime Academy Pro · Independencia</div>
          <div style={{fontSize:11,color:C.muted,marginTop:6}}>{t.updated}</div>
          <div style={{width:48,height:2,margin:"14px auto 0",background:`linear-gradient(90deg,${C.blue},${C.gold})`}}/>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {t.sections.map((s:any,i:number)=>(
            <div key={i} style={{padding:"18px 20px",borderRadius:16,background:"rgba(13,31,60,0.7)",border:`1px solid ${C.border}`}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:13,fontWeight:700,color:C.gold2,marginBottom:10,letterSpacing:0.5}}>{s.heading}</div>
              <div style={{fontSize:13,color:"rgba(240,244,255,0.8)",lineHeight:1.8}}>{s.body}</div>
            </div>
          ))}
        </div>

        <div style={{textAlign:"center",marginTop:32,fontSize:11,color:C.muted,lineHeight:1.8}}>
          © 2025 Maritime Academy Pro · Independencia<br/>
          {lang==="fr"?"Tous droits réservés":lang==="es"?"Todos los derechos reservados":lang==="pt"?"Todos os direitos reservados":"All rights reserved"}
        </div>
      </div>
    </div>
  );
}
