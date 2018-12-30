import { Button, IButtonProps } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';

import { ElectronVersionState } from '../../interfaces';
import { AppState } from '../state';

export interface RunnerState {
}

export interface RunnerProps {
  appState: AppState;
}

/**
 * The runner component is responsible for actually launching the fiddle
 * with Electron. It also renders the button that does so.
 *
 * @class Runner
 * @extends {React.Component<RunnerProps, RunnerState>}
 */
@observer
export class Runner extends React.Component<RunnerProps, RunnerState> {
  public render() {
    const { isRunning, currentElectronVersion } = this.props.appState;

    const state = currentElectronVersion.state;
    const props: IButtonProps = { className: 'button-run' };

    if (state === ElectronVersionState.downloading) {
      props.text = 'Downloading';
      props.disabled = true;
      props.loading = true;
    } else if (state === ElectronVersionState.ready) {
      if (isRunning) {
        props.active = true;
        props.text = 'Stop';
        props.onClick = window.ElectronFiddle.app.runner.stop;
        props.icon = 'stop';
      } else {
        props.text = 'Run';
        props.onClick = window.ElectronFiddle.app.runner.run;
        props.icon = 'play';
      }
    } else {
      return null;
    }

    return <Button {...props} />;
  }
}
