import { ActivityIndicator, ScrollView } from 'react-native';
import { useQuery } from 'react-query';

import { Container } from '#design/layout';
import { P } from '#design/typography';

export function PostsScreen() {
  const { isLoading, data } = useQuery<{ posts: { id: string; title: string }[] }>('posts', () =>
    fetch('https://dummyjson.com/posts').then(response => response.json()),
  );

  if (isLoading) {
    return (
      <Container className="justify-center">
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <Container
      className="pt-4"
      edges={['bottom']}
    >
      <ScrollView className="gap-0 pr-4">{data?.posts.map(post => <P key={post.id}>{post.title}</P>)}</ScrollView>
    </Container>
  );
}
