import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {LicenseProvider, TrelloProvider} from '@optro/ui-react';
import {OptroLicenseApi} from '@optro/api-client';
import '@optro/ui-react/bundle.css';

// Lazy Loaders
const BoardButton = React.lazy(() => import('./board-button/BoardButton'))
const CardButton = React.lazy(() => import('./card-button/CardButton'))
const CardBackSection = React.lazy(() => import('./card-back-section/CardBackSection'))
const ShowSettings = React.lazy(() => import('./show-settings/ShowSettings'))

const t = window.TrelloPowerUp.iframe();
const optroClient = new OptroLicenseApi(process.env.OPTRO_API_KEY as string, process.env.POWERUP_ID as string);

function PowerupRouter() {
  return (
    <div>
      <TrelloProvider t={t}>
<LicenseProvider optroClient={optroClient} apiKey={process.env.OPTRO_API_KEY as string} licenseType={'board'} powerupId={process.env.POWERUP_ID as string}>
        <Suspense fallback={<div style={{ margin: '6px' }}>Loading...</div>}>
          <Router basename={process.env.CONTEXT_PATH || undefined}>
                <Route path={`/board-button.html`}>
                    <BoardButton />
                </Route>
                <Route path={`/card-button.html`}>
                    <CardButton />
                </Route>
                <Route path={`/card-back-section.html`}>
                    <CardBackSection />
                </Route>
                <Route path={`/show-settings.html`}>
                    <ShowSettings />
                </Route>
          </Router>
        </Suspense>
</LicenseProvider>
      </TrelloProvider>
    </div>
  );
  // EOF
}

export default PowerupRouter;
