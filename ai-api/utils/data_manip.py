from typing import List

def sort_products(image_db_results:List, text_db_results:List)->List:
    results = image_db_results + text_db_results
    sorted_results = [x[0] for x in sorted(results, key=lambda x: x[1], reverse=True)]
    final_result = filterout(sorted_results)
    return final_result
    
def filterout(query_results:List) -> List:
    results = list(dict.fromkeys(query_results))
    return results