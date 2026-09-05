import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};
const users = [
  { id: 1, name: "Bob", active: true },
  { id: 2, name: "Alice", active: false },
  { id: 3, name: "Steve", active: true },
];

const FeatureList: FeatureItem[] = [
  {
    title: 'Realize the creative principle of the cosmos',
    Svg: require('@site/static/img/cosmos-creative-principle.svg').default,
    description: (
      <>
        Trace how generative tension gives rise to pattern, form, and meaning
        across scales of existence.
      </>
    ),
  },
  {
    title: 'Understand the principality of emergence',
    Svg: require('@site/static/img/emergence-principality.svg').default,
    description: (
      <>
        Explore how simple interactions compound into higher-order structures,
        behaviors, and organizing principles.
      </>
    ),
  },
  {
    title: 'Understand the nature of complexity',
    Svg: require('@site/static/img/complexity-nature.svg').default,
    description: (
      <>
        Map the boundary where order and chaos meet, and where adaptive systems
        become most alive.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div className='container'>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
            <li key={user.id}>{user.name} {user.active}</li>)
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
