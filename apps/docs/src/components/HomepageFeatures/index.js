import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: "Architecture",
    // Svg,
    description:
      "Explore the system architecture and design principles used in this project.",
  },
  {
    title: "Engineering Decisions",
    // Svg,
    description:
      "Read about the technical choices and reasoning behind the system.",
  },
  {
    title: "Development Roadmap",
    // Svg,
    description:
      "Follow the evolution of the platform and future improvements.",
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      {/* <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div> */}
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
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
