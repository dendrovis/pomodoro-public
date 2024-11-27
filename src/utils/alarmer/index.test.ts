import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest';
import { alarmer, cache } from '../index';
import { OWNER_ID, PRODUCT_ID } from '../../constants';
import AUDIO_BREAK from '../../../public/assets/audio/alarm_break.mp3';

describe('when set to alarm', () => {
  it('should show true value', () => {
    alarmer.setValue(true);
    expect(alarmer.getValue()).toBe(true);
  });
});

describe('when set to not be alarm', () => {
  it('should show light mode value', () => {
    alarmer.setValue(false);
    expect(alarmer.getValue()).toBe(false);
  });
});

describe('when alarmer is save', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('should show in local storage', () => {
    cache.on();
    cache.setProductID(`${PRODUCT_ID}`);
    alarmer.onSave();
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem(`${OWNER_ID}_${PRODUCT_ID}_isAlarmed`)).not.toBeNull();
  });
});

describe('when alarmer is played', () => {
  let audioElement: HTMLAudioElement;

  beforeEach(() => {
    audioElement = document.createElement('audio');
    audioElement.src = AUDIO_BREAK;
    document.body.appendChild(audioElement);
  });

  afterEach(() => {
    document.body.removeChild(audioElement);
  });

  it('should not played the audio when not allowed', async () => {
    alarmer.setValue(false);
    const playSpy = vi.spyOn(audioElement, 'play').mockImplementation(() => {
      return Promise.resolve();
    });
    const button = document.createElement('button');
    button.addEventListener('click', async () => {
      try {
        await alarmer.alarmNow(audioElement);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    });

    button.click();

    expect(playSpy).not.toHaveBeenCalled();
  });

  it('should played the audio when allowed', async () => {
    alarmer.setValue(true);
    const playSpy = vi.spyOn(audioElement, 'play').mockImplementation(() => {
      return Promise.resolve();
    });
    const button = document.createElement('button');
    button.addEventListener('click', async () => {
      try {
        await alarmer.alarmNow(audioElement);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    });

    button.click();

    expect(playSpy).toHaveBeenCalled();
  });
});
