import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const androidAvd = process.env.ANDROID_AVD_NAME || 'Medium_Phone_API_36.1';
const iosDeviceName = process.env.IOS_SIMULATOR_NAME || 'iPhone 16 Pro';
const androidHome = process.env.ANDROID_HOME || `${process.env.HOME}/Library/Android/sdk`;
const emulatorBinary = `${androidHome}/emulator/emulator`;

async function run(command, args = []) {
  return execFileAsync(command, args, { env: process.env });
}

async function isIosBooted() {
  const { stdout } = await run('xcrun', ['simctl', 'list', 'devices', 'booted']);
  return stdout.includes(iosDeviceName);
}

async function startIosSimulator() {
  try {
    if (!(await isIosBooted())) {
      await run('xcrun', ['simctl', 'boot', iosDeviceName]);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`iOS simulator not started: ${message}`);
  }

  try {
    await run('open', ['-a', 'Simulator']);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Simulator app not opened: ${message}`);
  }
}

async function isAndroidRunning() {
  try {
    const { stdout } = await run('adb', ['devices']);
    return stdout
      .split('\n')
      .some((line) => line.trim().startsWith('emulator-') && line.includes('\tdevice'));
  } catch {
    return false;
  }
}

async function startAndroidEmulator() {
  try {
    if (await isAndroidRunning()) {
      return;
    }

    spawn(emulatorBinary, ['-avd', androidAvd], {
      detached: true,
      stdio: 'ignore',
      env: process.env,
    }).unref();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Android emulator not started: ${message}`);
  }
}

async function main() {
  await Promise.all([startIosSimulator(), startAndroidEmulator()]);
  console.log(`Starting emulators for iOS (${iosDeviceName}) and Android (${androidAvd})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
