import argparse
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors

df = pd.read_csv('recipes.csv')

df['ingredients'] = df['ingredients'].apply(lambda x: ' '.join(x.lower() for x in x.split(',')))
df['name'] = df['name'].apply(lambda x: x.lower())

vectorizer_name = TfidfVectorizer(stop_words='english')
tfidf_matrix_name = vectorizer_name.fit_transform(df['name'])

vectorizer_ing = TfidfVectorizer(stop_words='english')
tfidf_matrix_ing = vectorizer_ing.fit_transform(df['ingredients'])

model_knn_name = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=20, n_jobs=-1)
model_knn_name.fit(tfidf_matrix_name)

model_knn_ing = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=20, n_jobs=-1)
model_knn_ing.fit(tfidf_matrix_ing)


def recommend_recipes(query, data, model_name, model_ing, vectorizer_name, vectorizer_ing, search_by):
    if search_by == 'name':
        transform_query = vectorizer_name.transform([query])
        model = model_name
    elif search_by == 'ingredients':
        transform_query = vectorizer_ing.transform([query])
        model = model_ing
    distances, indices = model.kneighbors(transform_query, n_neighbors=5)
    idx = indices.squeeze().tolist()
    return [data.iloc[i]['name'] for i in idx]


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-sb", "--search_by", choices=["name", "ingredients"], default="name")
    parser.add_argument("-q", "--query", default="chicken")
    args = parser.parse_args()
    search_by = args.search_by
    query = args.query
    recommendations = recommend_recipes(query, df, model_knn_name, model_knn_ing, vectorizer_name, vectorizer_ing,
                                        search_by)
    print(",".join(recommendations))
