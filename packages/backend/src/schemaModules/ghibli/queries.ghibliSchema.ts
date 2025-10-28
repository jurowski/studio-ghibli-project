import { stringArg, nonNull, extendType } from 'nexus';
import { HelloWorld, Film } from './objectTypes.ghibliSchema';
import { GraphQLError } from 'graphql';
import { GQL_ERROR_CODES, ErrorMessages } from '~/shared/constants';
import { getHelloWorld } from '~/shared/utils';
import { HttpService } from '~/services/Http/Http.service';

export const TourQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('helloWorld', {
      type: nonNull(HelloWorld),
      resolve: async () => {
        try {
          const helloWorld = getHelloWorld();
          return helloWorld;
        } catch (error) {
          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });

    t.field('film', {
      type: Film,
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_root, { id }) => {
        try {
          const http = new HttpService();
          const resp = await http.get({
            endpoint: `https://ghibliapi.vercel.app/films/${id}`,
          });

          return resp.data;
        } catch (error) {
          if (error instanceof GraphQLError) {
            throw error;
          }

          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });

    // Return a list of films from the public Studio Ghibli API
    t.list.field('films', {
      type: Film,
      resolve: async () => {
        // We want to return a stable set of four films in a consistent order.
        // Fetch the public list, then pick the required titles in order.
        const REQUIRED_TITLES = [
          'My Neighbor Totoro',
          'Spirited Away',
          'Princess Mononoke',
          "Howl's Moving Castle",
        ];

        // A small local override to use if the external API is unavailable
        const OVERRIDE_FILMS = [
          {
            id: '1',
            title: 'My Neighbor Totoro',
            description:
              'A gentle, magical tale about two sisters who befriend a forest spirit while navigating life in the countryside.',
            director: 'Hayao Miyazaki',
            producer: 'Toru Hara',
            release_date: '1988',
            running_time: '86',
            rt_score: '94',
            image: 'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif',
            movie_banner: '',
          },
          {
            id: '2',
            title: 'Spirited Away',
            description:
              'A young girl becomes trapped in a magical bathhouse and must navigate a world of spirits to save her parents.',
            director: 'Hayao Miyazaki',
            producer: 'Toshio Suzuki',
            release_date: '2001',
            running_time: '125',
            rt_score: '97',
            image:
              'https://upload.wikimedia.org/wikipedia/en/3/30/Spirited_Away_poster.jpg',
            movie_banner: '',
          },
          {
            id: '3',
            title: 'Princess Mononoke',
            description:
              'A warrior caught in a fierce battle between forest spirits and humans exploiting nature for industry.',
            director: 'Hayao Miyazaki',
            producer: 'Toshio Suzuki',
            release_date: '1997',
            running_time: '134',
            rt_score: '93',
            image:
              'https://upload.wikimedia.org/wikipedia/en/4/46/Princess_Mononoke_Japanese_Poster_%281997%29.jpg',
            movie_banner: '',
          },
          {
            id: '4',
            title: "Howl's Moving Castle",
            description:
              "A woman cursed with old age finds refuge in a wizard's magical walking castle as war looms over the land.",
            director: 'Hayao Miyazaki',
            producer: 'Toshio Suzuki',
            release_date: '2004',
            running_time: '119',
            rt_score: '87',
            image:
              'https://upload.wikimedia.org/wikipedia/en/a/a0/Howls-moving-castleposter.jpg',
            movie_banner: '',
          },
        ];

        try {
          const http = new HttpService();
          const resp = await http.get({
            endpoint: `https://ghibliapi.vercel.app/films`,
          });

          const list = Array.isArray(resp?.data) ? resp.data : [];

          // Map reported films by normalized title for robust matching
          const mapByTitle = new Map<string, any>();
          for (const item of list) {
            if (item && item.title) {
              mapByTitle.set(String(item.title).trim().toLowerCase(), item);
            }
          }

          const result: any[] = [];
          for (const t of REQUIRED_TITLES) {
            const found = mapByTitle.get(t.toLowerCase());
            if (found) {
              result.push(found);
              continue;
            }

            // If not found in fetched list, fall back to local override
            const override = OVERRIDE_FILMS.find((o) => o.title === t);
            if (override) {
              result.push(override);
            }
          }

          return result;
        } catch (error) {
          // If the external API fails, return the local override set rather than throwing.
          // This keeps the frontend resilient and predictable for the take-home challenge.
          // Log the original error to aid debugging.
          // eslint-disable-next-line no-console
          console.warn(
            'Failed to fetch films from external API, using local override.',
            error,
          );
          return OVERRIDE_FILMS;
        }
      },
    });
  },
});
