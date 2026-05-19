import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

type FeatureItem = {
  title: ReactNode;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: (
      <Translate id="homepage.feature.hardware.title">
        Hardware Products
      </Translate>
    ),
    description: (
      <Translate id="homepage.feature.hardware.desc">
        ESP32 core boards, RF expansion modules, and touch displays covering all IoT scenarios.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.feature.dev.title">
        Development Guides
      </Translate>
    ),
    description: (
      <Translate id="homepage.feature.dev.desc">
        MicroPython, Arduino, and ESP-IDF — complete tutorials from beginner to advanced.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.feature.eco.title">
        Open Source Ecosystem
      </Translate>
    ),
    description: (
      <Translate id="homepage.feature.eco.desc">
        Open-source projects and community contributions on GitHub, sharing firmware, cases, and best practices.
      </Translate>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDesc}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={clsx('rb-grid', styles.features)}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
