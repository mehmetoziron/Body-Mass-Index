# Body-Mass-Index

Eine einfache mobile App zur Berechnung des **Body Mass Index (BMI)** mit **React Native** und **Expo**.

## 📱 Funktionen

- Wähle dein **Gewicht (kg)** über einen Schieberegler.
- Wähle deine **Größe (cm)** über einen weiteren Schieberegler.
- Der **BMI-Wert** wird automatisch berechnet und in einem farblich angepassten Schieberegler dargestellt.
- Eine Textanzeige unterhalb zeigt den BMI-Status wie z. B. „Untergewicht“, „Normalgewicht“, „Adipositas“ usw.
- Mit dem **„Speichern“-Button** können die aktuellen Werte dauerhaft lokal gespeichert werden.
- Beim erneuten Öffnen der App werden die zuletzt gespeicherten Werte automatisch geladen und angezeigt.

## 💾 Lokale Speicherung

Die App verwendet `AsyncStorage`, um Gewicht und Größe lokal auf dem Gerät zu speichern. Nach dem Speichern bleiben die Werte auch nach dem Schließen der App erhalten.

## 🛠️ Technologien

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage)
- [`@react-native-assets/slider`](https://github.com/ptelad/react-native-slider)

## ▶️ Projekt starten

```bash
git clone https://github.com/dein-benutzername/BMI.git
cd BMI
npm install
npx expo start

📸 Screenshots
<!-- Hier kannst du später Screenshots einfügen -->
👨‍💻 Autor
Mehmet Özdemir
